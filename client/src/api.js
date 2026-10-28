// Central API helper: uses VITE_APP_URI_API if set, else localhost
export const API_BASE =
  (import.meta.env?.VITE_APP_URI_API?.replace(/\/$/, "")) || "http://localhost:5000";

export const api = async (path, { method = "GET", body, token } = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.extraDetails || data.message || "Request failed");
  return data;
};
