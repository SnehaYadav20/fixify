import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { api } from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const statusLabel = (s) => s.replace("_", " ");

const Bookings = () => {
  const { authorizationToken, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const t = token || localStorage.getItem("token");
      const data = await api("/api/bookings/mine", { headers: undefined, token: t });
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    try {
      const t = token || localStorage.getItem("token");
      await api(`/api/bookings/${id}/status`, { method: "PATCH", body: { status }, token: t });
      toast.success(`Booking ${statusLabel(status)}`);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  // v2 token path uses Bearer without "Bearer " prefix duplication guard
  return (
    <section className="section-services page-enter">
      <div className="container">
        <h1 className="main-heading">My Bookings</h1>
        <p>Track jobs, accept as provider, chat per booking, pay mock + review when done.</p>
      </div>
      <div className="container">
        {loading ? (
          <><div className="skeleton" /><br /><div className="skeleton" /><br /><div className="skeleton" /></>
        ) : bookings.length === 0 ? (
          <p>No bookings yet. <Link to="/services">Browse services</Link></p>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "2rem" }}>
            {bookings.map((b) => (
              <div className="card lift" key={b._id} style={{ padding: "1.6rem", border: "1px solid #e3e6ff", borderRadius: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{b.service?.name || "Service"}</strong>
                  <span className={`pill pill-${b.status}`}>{statusLabel(b.status)}</span>
                </div>
                <p style={{ fontSize: "1.4rem", marginTop: 6 }}>
                  {new Date(b.scheduledAt).toLocaleString()} · {b.address}
                </p>
                <p style={{ fontSize: "1.4rem" }}>
                  Customer: {b.customer?.name} · Provider: {b.provider?.name || "awaiting"} ·{" "}
                  <span className={`pill pill-${b.paymentStatus}`}>{b.paymentStatus}</span>
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                  <Link to={`/bookings/${b._id}`}><button>Open</button></Link>
                  {b.status === "pending" && <button onClick={() => setStatus(b._id, "accepted")}>Accept</button>}
                  {b.status === "accepted" && <button onClick={() => setStatus(b._id, "in_progress")}>Start</button>}
                  {b.status === "in_progress" && <button onClick={() => setStatus(b._id, "completed")}>Complete</button>}
                  {(b.status === "pending" || b.status === "accepted") && (
                    <button onClick={() => setStatus(b._id, "cancelled")} className="secondary-btn">Cancel</button>
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

// keep old named export working
export default Bookings;
export { Bookings };
