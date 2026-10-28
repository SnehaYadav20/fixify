import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myBookings, updateBookingStatus } from "../../lib/liveApi";
import { toast } from "react-toastify";

const statusLabel = (s) => (s || "").replace("_", " ");

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setBookings(await myBookings());
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Booking ${statusLabel(status)}`);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <section className="section-services page-enter">
      <div className="container">
        <h1 className="main-heading">My Bookings</h1>
        <p>Live from Supabase — no local server needed.</p>
      </div>
      <div className="container">
        {loading ? (
          <><div className="skeleton" /><br /><div className="skeleton" /><br /><div className="skeleton" /></>
        ) : bookings.length === 0 ? (
          <p>No bookings yet. <Link to="/services">Browse services</Link></p>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "2rem" }}>
            {bookings.map((b) => (
              <div className="card lift" key={b.id} style={{ padding: "1.6rem", border: "1px solid #e3e6ff", borderRadius: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{b.services?.name || "Service"}</strong>
                  <span className={`pill pill-${b.status}`}>{statusLabel(b.status)}</span>
                </div>
                <p style={{ fontSize: "1.4rem", marginTop: 6 }}>
                  {b.scheduled_at ? new Date(b.scheduled_at).toLocaleString() : ""} · {b.address}
                </p>
                <p style={{ fontSize: "1.4rem" }}>
                  Customer: {b.customer?.name} · Provider: {b.provider?.name || "awaiting"} ·{" "}
                  <span className={`pill pill-${b.payment_status}`}>{b.payment_status}</span>
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                  <Link to={`/bookings/${b.id}`}><button>Open</button></Link>
                  {b.status === "pending" && <button onClick={() => setStatus(b.id, "accepted")}>Accept</button>}
                  {b.status === "accepted" && <button onClick={() => setStatus(b.id, "in_progress")}>Start</button>}
                  {b.status === "in_progress" && <button onClick={() => setStatus(b.id, "completed")}>Complete</button>}
                  {(b.status === "pending" || b.status === "accepted") && (
                    <button onClick={() => setStatus(b.id, "cancelled")} className="secondary-btn">Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bookings;
export { Bookings };
