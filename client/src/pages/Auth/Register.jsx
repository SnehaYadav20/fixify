import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { signUp } from "../../lib/liveApi";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", role: "customer", aadhar: "", jobType: "Plumber",
  });
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signUp(form);
      await refreshUser();
      toast.success("Account created! You are logged in.");
      navigate(form.role === "provider" ? "/bookings" : "/services");
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
                <input name="name" required value={form.name} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder="Your name" autoComplete="off" />
              </div>
              <div>
                <label>Email</label>
                <input name="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder="you@mail.com" autoComplete="off" />
              </div>
              <div>
                <label>Phone</label>
                <input name="phone" required value={form.phone} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder="10-digit mobile" autoComplete="off" />
              </div>
              <div>
                <label>Password (min 6 for Supabase default)</label>
                <input name="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} autoComplete="off" />
              </div>
              <div>
                <label>I am a</label>
                <select name="role" value={form.role} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} id="jobType">
                  <option value="customer">Customer</option>
                  <option value="provider">Service Provider</option>
                </select>
              </div>
              {form.role === "provider" && (
                <>
                  <div>
                    <label>Aadhar (12 digits)</label>
                    <input name="aadhar" required value={form.aadhar} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} placeholder="xxxx-xxxx-xxxx" autoComplete="off" />
                  </div>
                  <div>
                    <label>Job type</label>
                    <select name="jobType" value={form.jobType} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} id="jobType">
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
