# Fixify goes live (Supabase) — no local backend needed

MongoDB is out. The app now uses **Supabase Postgres** directly from the browser.

## One-time setup (5 min)

1. Create a free project at https://supabase.com
2. **SQL Editor → New query** → paste `supabase/schema.sql` → **Run**
   (creates profiles, services, bookings, reviews, messages + seed services)
3. **Authentication → Settings** → turn OFF "Confirm email" (dev only)
4. **Settings → API** → copy `Project URL` + `anon public` key
5. Put them in `client/.env`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```
6. Restart the dev server:
```powershell
cd "F:\project\fixify\Project\client"
npm run dev
```

That's it — **no `npm start` in server, no Mongo, nothing else to boot.**
Services load live, register/login works, bookings + live chat + reviews all hit Supabase.

## What changed

- `supabase/schema.sql` — tables + RLS + seed data
- `client/src/supabaseClient.js` + `client/src/lib/liveApi.js` — all data access
- `store/auth.jsx` — Supabase session + profiles (role: customer/provider/admin)
- `Services, Bookings, BookingDetail, Login, Register` — rewritten on liveApi
- Chat in BookingDetail is **realtime** (supabase channel), not 5s polling
- `server/` folder is dormant — kept for reference, not used by the live app

## Make an admin

In Supabase → Table Editor → `profiles` → set your row's `role` to `admin`.
