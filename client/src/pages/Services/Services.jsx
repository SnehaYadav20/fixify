import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { api } from "../../api";
import { toast } from "react-toastify";
import design from '../../images/design.png';

const Service = () => {
  const { services, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [form, setForm] = useState({ scheduledAt: "", address: "", note: "" });
  const [search, setSearch] = useState("");

  const filtered = (services || []).filter((s) => {
    const q = search.toLowerCase();
    return !q || s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q);
  });

  const openBook = (s) => {
    if (!isLoggedIn) {
      toast.info("Please login to book");
      return navigate("/login");
    }
    setActive(s);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      const t = token || localStorage.getItem("token");
      await api("/api/bookings", {
        method: "POST",
        token: t,
        body: { service: active._id, ...form },
      });
      toast.success("Booking created! Track it in My Bookings.");
      setActive(null);
      setForm({ scheduledAt: "", address: "", note: "" });
      navigate("/bookings");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="section-services page-enter">
      <div className="container">
        <h1 className="main-heading">Services</h1>
        <input
          placeholder="Search plumber, electrician…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginTop: 12, width: "min(420px,90%)" }}
        />
      </div>

      <div className="container grid grid-three-cols">
        {filtered.map((curElem, index) => {
          const { name, category, description, price, duration } = curElem;
          return (
            <div className="card lift" key={curElem._id || index}>
              <div className="card-img">
                <img src={design} alt="service" width="200" />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{name}</p>
                  <p>{category}</p>
                </div>
                <h2>{description}</h2>
                <p>Price (per visit): ₹{price}</p>
                <p>Duration (min): {duration}</p>
                <button className="submit" onClick={() => openBook(curElem)}>Book Now</button>
              </div>
            </div>
          );
        })}
        <p>*Additional charges may apply based on inspection*</p>
      </div>

      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Book: {active.name}</h2>
            <p>₹{active.price} · ~{active.duration} min</p>
            <form onSubmit={submitBooking}>
              <label>Date & time</label>
              <input type="datetime-local" required value={form.scheduledAt}
                onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })} />
              <label>Address</label>
              <textarea required rows="3" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="House no, street, area, Pune" />
              <label>Note (optional)</label>
              <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="e.g. leaking tap in kitchen" />
              <br /><br />
              <button type="submit">Confirm booking</button>{" "}
              <button type="button" className="secondary-btn" onClick={() => setActive(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Service;
