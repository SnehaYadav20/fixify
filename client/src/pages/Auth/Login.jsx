import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { signIn } from "../../lib/liveApi";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signIn(form.email, form.password);
      await refreshUser();
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="section-registration page-enter">
      <main>
        <div className="container grid grid-two-cols">
          <div className="registration-form">
            <h1 className="main-heading mb-3">Login</h1>
            <p>Live Supabase auth — no local server needed.</p>
            <form onSubmit={submit}>
              <div>
                <label>Email</label>
                <input name="email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@mail.com" autoComplete="off" />
              </div>
              <div>
                <label>Password</label>
                <input name="password" type="password" required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" autoComplete="off" />
              </div>
              <br />
              <button type="submit">Login</button>
              <p><Link to="/register" className="ms-2">New here? Create account</Link></p>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
