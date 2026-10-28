import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { api } from "../../api";
import { toast } from "react-toastify";

const BookingDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const t = () => token || localStorage.getItem("token");
  const [booking, setBooking] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const load = async () => {
    try {
      const all = await api("/api/bookings/mine", { token: t() });
      setBooking(all.find((b) => b._id === id));
      const m = await api(`/api/messages/${id}`, { token: t() });
      setMsgs(m);
      // provider reviews if provider known
      const b = all.find((x) => x._id === id);
      if (b?.provider?._id) {
        const r = await api(`/api/reviews/provider/${b.provider._id}`);
        setReviews(r);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => { load(); const i = setInterval(load, 5000); return () => clearInterval(i); }, [id]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api(`/api/messages/${id}`, { method: "POST", body: { text }, token: t() });
    setText("");
    load();
  };

  const payMock = async () => {
    // mock payment: just mark flow complete via status note + toast
    toast.success("Mock payment successful (UPI/Card stub). Marking as paid in UI.");
    // In real Razorpay/Stripe you'd verify webhook then set paymentStatus=paid server-side.
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api("/api/reviews", { method: "POST", body: { booking: id, rating: Number(rating), comment }, token: t() });
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
      <h1 className="main-heading">{booking.service?.name} — {booking.status}</h1>
      <p>{new Date(booking.scheduledAt).toLocaleString()} · {booking.address}</p>
      <p>Customer: {booking.customer?.name} · Provider: {booking.provider?.name || "awaiting"}</p>

      <div className="grid grid-two-cols" style={{ marginTop: "2rem" }}>
        <div>
          <h2>Chat (per booking)</h2>
          <div className="chat-box">
            {msgs.map((m) => (
              <div key={m._id} className={`chat-msg ${String(m.sender?._id || m.sender) === String(booking.customer?._id) ? "chat-them" : "chat-me"}`}>
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
          <p>Price: ₹{booking.service?.price || booking.priceQuoted || "—"} · Status: {booking.paymentStatus}</p>
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
                <p key={r._id}>⭐ {r.rating} — {r.comment} <small>by {r.customer?.name}</small></p>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingDetail;
