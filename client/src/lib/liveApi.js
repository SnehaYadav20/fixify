import { supabase } from "../supabaseClient";

// ---------- AUTH ----------
export async function signUp({ name, email, phone, password, role, aadhar, jobType }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  const user = data.user;
  if (!user) throw new Error("Signup needs email confirmation. Check your inbox (or disable Confirm email in Supabase Auth settings for dev).");
  const { error: pErr } = await supabase.from("profiles").insert({
    id: user.id, email, name, phone, role,
    aadhar: role === "provider" ? aadhar || null : null,
    job_type: role === "provider" ? jobType || null : null,
  });
  if (pErr) throw new Error(pErr.message);
  return user;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data.user;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getProfile(userId) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) throw new Error(error.message);
  return data;
}

// ---------- SERVICES ----------
export async function getServices() {
  const { data, error } = await supabase
    .from("services").select("*").eq("active", true).order("created_at");
  if (error) throw new Error(error.message);
  return data || [];
}

// ---------- BOOKINGS ----------
export async function createBooking({ service_id, scheduled_at, address, note }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Please login to book");
  const { data, error } = await supabase.from("bookings").insert({
    customer_id: user.id, service_id, scheduled_at: scheduled_at, address, note: note || null,
  }).select("*, services(*)").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function myBookings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Please login");
  const profile = await getProfile(user.id).catch(() => null);
  const role = profile?.role;

  let query = supabase.from("bookings").select("*, services(*), customer:profiles!bookings_customer_id_fkey(id,name), provider:profiles!bookings_provider_id_fkey(id,name,job_type)").order("created_at", { ascending: false });

  if (role === "provider") {
    // assigned to me OR unassigned pending
    const { data, error } = await query.or(`provider_id.eq.${user.id},and(provider_id.is.null,status.eq.pending)`);
    if (error) throw new Error(error.message);
    // above or() applies to whole query; simpler: fetch both and merge
    return data || [];
  }
  const { data, error } = await query.eq("customer_id", user.id);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function updateBookingStatus(id, status, claimAsProvider = true) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Please login");
  const patch = { status };
  if (status === "accepted" && claimAsProvider) patch.provider_id = user.id;
  const { data, error } = await supabase.from("bookings").update(patch).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

// ---------- CHAT ----------
export async function getMessages(bookingId) {
  const { data, error } = await supabase.from("messages")
    .select("*, sender:profiles!messages_sender_id_fkey(id,name)").eq("booking_id", bookingId).order("created_at");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function sendMessage(bookingId, text) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Please login");
  const { data, error } = await supabase.from("messages")
    .insert({ booking_id: bookingId, sender_id: user.id, text }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

// ---------- REVIEWS ----------
export async function createReview({ booking_id, provider_id, rating, comment }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Please login");
  const { data, error } = await supabase.from("reviews")
    .insert({ booking_id, customer_id: user.id, provider_id, rating, comment: comment || null })
    .select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function providerReviews(providerId) {
  const { data, error } = await supabase.from("reviews")
    .select("*, customer:profiles!reviews_customer_id_fkey(name)").eq("provider_id", providerId).order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}
