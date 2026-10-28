-- Fixify live DB (Supabase Postgres). Paste into Supabase Dashboard -> SQL Editor -> Run.
-- Then: Auth -> Settings -> disable "Confirm email" for dev (or keep on for prod).

create extension if not exists "pgcrypto";

-- PROFILES (one row per auth user)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  phone text,
  role text not null default 'customer' check (role in ('customer','provider','admin')),
  aadhar text,
  job_type text,
  created_at timestamptz default now()
);

-- SERVICES catalog (public read)
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  category text not null,
  price numeric not null,
  duration int not null,
  active boolean default true,
  created_at timestamptz default now()
);

-- BOOKINGS
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid references public.profiles(id) on delete set null,
  service_id uuid not null references public.services(id),
  scheduled_at timestamptz not null,
  address text not null,
  note text,
  status text not null default 'pending'
    check (status in ('pending','accepted','in_progress','completed','cancelled')),
  price_quoted numeric,
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','paid','refunded')),
  created_at timestamptz default now()
);

-- REVIEWS (one per booking)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid unique not null references public.bookings(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- CHAT per booking
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.messages enable row level security;

-- SERVICES: anyone can read, only admins manage (service_role bypasses RLS anyway)
drop policy if exists "services public read" on public.services;
create policy "services public read" on public.services for select using (true);

-- PROFILES: public read (for provider names), users insert/update own row
drop policy if exists "profiles public read" on public.profiles;
create policy "profiles public read" on public.profiles for select using (true);
drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update using (auth.uid() = id);

-- BOOKINGS
drop policy if exists "bookings customer insert" on public.bookings;
create policy "bookings customer insert" on public.bookings
  for insert with check (auth.uid() = customer_id);
drop policy if exists "bookings select involved or pending" on public.bookings;
create policy "bookings select involved or pending" on public.bookings
  for select using (
    auth.uid() = customer_id
    or auth.uid() = provider_id
    or (provider_id is null and status = 'pending')
  );
drop policy if exists "bookings update involved" on public.bookings;
create policy "bookings update involved" on public.bookings
  for update using (
    auth.uid() = customer_id
    or auth.uid() = provider_id
    or (provider_id is null and status = 'pending')
  );

-- MESSAGES: booking participants can read/write
drop policy if exists "messages select participants" on public.messages;
create policy "messages select participants" on public.messages
  for select using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id
      and (b.customer_id = auth.uid() or b.provider_id = auth.uid())
    )
  );
drop policy if exists "messages insert participants" on public.messages;
create policy "messages insert participants" on public.messages
  for insert with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.bookings b
      where b.id = booking_id
      and (b.customer_id = auth.uid() or b.provider_id = auth.uid() or b.provider_id is null)
    )
  );

-- REVIEWS: customer writes after completion, anyone reads
drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read" on public.reviews for select using (true);
drop policy if exists "reviews customer insert" on public.reviews;
create policy "reviews customer insert" on public.reviews
  for insert with check (auth.uid() = customer_id);

-- SEED services (runs only if table empty)
insert into public.services (name, description, category, price, duration)
select * from (values
  ('Tap & Leak Repair','Fix leaking taps, pipes and fittings','Plumber',299,60),
  ('Switch & Wiring Fix','Switches, sockets, MCB and wiring issues','Electrician',349,60),
  ('Furniture Assembly','Bed, wardrobe, table assembly and repair','Carpenter',499,120),
  ('Full Home Cleaning','Deep cleaning for 1-3 BHK homes','Cleaner',1499,240),
  ('Wall Painting (per room)','Single room repaint with putty + 2 coats','Painter',3999,480),
  ('AC Service & Gas Check','Split/window AC foam service + cooling check','AC Repair',599,90)
) as v(name, description, category, price, duration)
where not exists (select 1 from public.services);
