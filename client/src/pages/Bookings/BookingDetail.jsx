import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { myBookings, getMessages, sendMessage, createReview, providerReviews } from "../../lib/liveApi";
import { toast } from "react-toastify";

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const load = async () => {
    try {
      const all = await myBookings();
      const b = all.find((x) => x.id === id);
      setBooking(b || null);
      setMsgs(await getMessages(id));
      if (b?.provider?.id) setReviews(await providerReviews(b.provider.id));
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    load();
    // live realtime chat
    const ch = supabase.channel(`booking-${id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `booking_id=eq.${id}` }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await sendMessage(id, text.trim());
      setText("");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const payMock = () => {
    toast.success("Mock payment successful. Plug Razorpay/Stripe order + webhook to mark paid for real.");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({ booking_id: id, provider_id: booking.provider?.id, rating: Number(rating), comment });
      toast.success("Thanks for the review!");
      setComment("");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!booking) return <p className="container page-enter">Loading booking…</p>;

  return (
    <section className="container page-enter">
      <h1 className="main-heading">{booking.services?.name} — {booking.status}</h1>
      <p>{booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleString() : ""} · {booking.address}</p>
      <p>Customer: {booking.customer?.name} · Provider: {booking.provider?.name || "awaiting"}</p>

      <div className="grid grid-two-cols" style={{ marginTop: "2rem" }}>
        <div>
          <h2>Chat (live)</h2>
          <div className="chat-box">
            {msgs.map((m) => (
              <div key={m.id} className="chat-msg chat-them">
                <div style={{ fontSize: "1.2rem", opacity: 0.7 }}>{m.sender?.name}</div>
                {m.text}
              </div>
            ))}
            {msgs.length === 0 && <p>No messages yet. Say hi!</p>}
          </div>
          <form onSubmit={send} style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" style={{ flex: 1 }} />
            <button type="submit">Send</button>
          </form>
        </div>

        <div>
          <h2>Payment (mock)</h2>
          <p>Price: ₹{booking.services?.price} · Status: {booking.payment_status}</p>
          <button onClick={payMock}>Pay now (mock)</button>

          <h2 style={{ marginTop: "2rem" }}>Review provider</h2>
          {booking.status !== "completed" ? (
            <p>Available after completion.</p>
          ) : (
            <form onSubmit={submitReview}>
              <label>Rating (1-5)</label>
              <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
              <label>Comment</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="3" />
              <br /><button type="submit">Submit review</button>
            </form>
          )}

          {reviews.length > 0 && (
            <>
              <h3>Provider reviews</h3>
              {reviews.map((r) => (
                <p key={r.id}>⭐ {r.rating} — {r.comment} <small>by {r.customer?.name}</small></p>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingDetail;
