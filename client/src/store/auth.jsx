import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { API_BASE } from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = token ? `Bearer ${token}` : "";

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  // v2 first, legacy fallback
  const refreshUser = useCallback(async (explicitToken) => {
    const t = explicitToken || localStorage.getItem("token");
    if (!t) {
      setUser(null);
      setIsLoading(false);
      return null;
    }
    try {
      setIsLoading(true);
      // try unified me
      let res = await fetch(`${API_BASE}/api/v2/auth/me`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsLoading(false);
        return data.user;
      }
      // legacy
      res = await fetch(`${API_BASE}/api/auth/user`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.userData);
        setIsLoading(false);
        return data.userData;
      }
      setUser(null);
      setIsLoading(false);
      return null;
    } catch {
      setIsLoading(false);
      return null;
    }
  }, []);

  const getServices = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/data/service`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.msg || data || []);
      }
    } catch (error) {
      console.log(`services error: ${error}`);
    }
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    refreshUser();
  }, [token, refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        token,
        isLoading,
        refreshUser,
        getServices,
      }}
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
