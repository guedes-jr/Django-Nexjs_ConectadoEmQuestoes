"use client";

import { useEffect, useState } from "react";
import { http } from "@/lib/http";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get("/api/auth/user/")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    window.location.href = "http://localhost:8000/accounts/logout/";
  };

  if (loading) return <main style={{ padding: 24 }}>Carregando...</main>;

  if (!user) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Sessão inválida</h1>
        <a href="/login">Voltar para login</a>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <button
        onClick={logout}
        style={{
          marginBottom: 16,
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #444",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
