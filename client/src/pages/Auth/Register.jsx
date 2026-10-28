import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { api } from "../../api";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", role: "customer", aadhar: "", jobType: "Plumber",
  });
  const navigate = useNavigate();
  const { storeTokenInLS, refreshUser } = useAuth();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.role === "customer") { delete payload.aadhar; delete payload.jobType; }
      const data = await api("/api/v2/auth/register", { method: "POST", body: payload });
      storeTokenInLS(data.token);
      await refreshUser(data.token);
      toast.success("Account created!");
      navigate(data.user.role === "provider" ? "/bookings" : "/services");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="section-registration page-enter">
      <main>
        <div className="container grid grid-two-cols">
          <div className="registration-form">
            <h1 className="main-heading mb-3">Create account</h1>
            <form onSubmit={submit}>
              <div>
                <label>Full name</label>
                <input name="name" required value={form.name} onChange={handle} placeholder="Your name" autoComplete="off" />
              </div>
              <div>
                <label>Email</label>
                <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@mail.com" autoComplete="off" />
              </div>
              <div>
                <label>Phone</label>
                <input name="phone" required value={form.phone} onChange={handle} placeholder="10-digit mobile" autoComplete="off" />
              </div>
              <div>
                <label>Password (min 8)</label>
                <input name="password" type="password" required value={form.password} onChange={handle} autoComplete="off" />
              </div>
              <div>
                <label>I am a</label>
                <select name="role" value={form.role} onChange={handle} id="jobType">
                  <option value="customer">Customer</option>
                  <option value="provider">Service Provider</option>
                </select>
              </div>
              {form.role === "provider" && (
                <>
                  <div>
                    <label>Aadhar (12 digits)</label>
                    <input name="aadhar" required value={form.aadhar} onChange={handle} placeholder="xxxx-xxxx-xxxx" autoComplete="off" />
                  </div>
                  <div>
                    <label>Job type</label>
                    <select name="jobType" value={form.jobType} onChange={handle} id="jobType">
                      <option>Plumber</option><option>Electrician</option><option>Carpenter</option>
                      <option>Cleaner</option><option>Painter</option><option>AC Repair</option>
                    </select>
                  </div>
                </>
              )}
              <br />
              <button type="submit">Register</button>
              <p><Link to="/login">Already have an account? Login</Link></p>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Register;
