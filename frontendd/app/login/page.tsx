"use client";
import { BACKEND_URL } from "@/lib/http";

export default function LoginPage() {
  return (
    <main style={{ maxWidth: 420, margin: "60px auto", padding: 16 }}>
      <button
        onClick={() => (window.location.href = `${BACKEND_URL}/accounts/google/login/`)}
      >
        Continue with Google
      </button>
    </main>
  );
}
