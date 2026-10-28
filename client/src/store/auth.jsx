import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { getProfile, getServices as fetchServices } from "../lib/liveApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null); // profile row + auth id
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  const token = session?.access_token || "";
  const authorizationToken = token ? `Bearer ${token}` : "";
  const isLoggedIn = !!session;

  const loadProfile = useCallback(async (userId) => {
    try {
      const p = await getProfile(userId);
      setUser({ ...p, authId: userId });
      return p;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    if (data.session?.user) await loadProfile(data.session.user.id);
    else setUser(null);
    setIsLoading(false);
  }, [loadProfile]);

  const storeTokenInLS = (t) => {
    // Supabase keeps the session itself; keep LS key for compat
    if (t) localStorage.setItem("token", t);
  };

  const LogoutUser = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const getServices = useCallback(async () => {
    try {
      setServices(await fetchServices());
    } catch (e) {
      console.log("services live error:", e.message);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    getServices();
    const { data: sub } = supabase.auth.onAuthStateChange(async (_evt, sess) => {
      setSession(sess);
      if (sess?.user) await loadProfile(sess.user.id);
      else setUser(null);
      setIsLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, [refreshUser, getServices, loadProfile]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, token, isLoading, refreshUser, getServices, session }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth used outside of the Provider");
  return v;
};

export { AuthContext, AuthProvider, useAuth };
