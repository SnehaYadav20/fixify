import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { storeTokenInLS, refreshUser } = useAuth();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { api } = await import("../../api");
      const data = await api("/api/v2/auth/login", { method: "POST", body: form });
      storeTokenInLS(data.token);
      await refreshUser(data.token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      // fallback to legacy logins
      try {
        const { api } = await import("../../api");
        const legacy = await api("/api/auth/loginC", { method: "POST", body: form });
        storeTokenInLS(legacy.token);
        toast.success("Login successful");
        navigate("/");
      } catch {
        toast.error(err.message);
      }
    }
  };

  return (
    <section className="section-registration page-enter">
      <main>
        <div className="container grid grid-two-cols">
          <div className="registration-form">
            <h1 className="main-heading mb-3">Login</h1>
            <p>One login for customers and providers.</p>
            <form onSubmit={submit}>
              <div>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@mail.com" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" required value={form.password} onChange={handle} placeholder="••••••••" autoComplete="off" />
              </div>
              <br />
              <button type="submit">Login</button>
              <p><Link to="/register" className="ms-2">New here? Create account</Link></p>
              <p style={{ marginTop: 8, fontSize: "1.4rem" }}>
                Old accounts: <Link to="/loginC">customer</Link> · <Link to="/loginS">provider</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
