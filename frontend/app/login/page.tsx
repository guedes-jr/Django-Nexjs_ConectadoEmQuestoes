"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { http } from "@/lib/http";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      await http.post("/api/auth/login/", { email, password });
      router.push("/dashboard");
    } catch (e: any) {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            CQ
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Bem-vindo ao Conectado em Questões
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Entre para continuar
          </p>
        </div>

        <button
          onClick={loginGoogle}
          className="mt-6 w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          type="button"
        >
          Continuar com Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs text-slate-500">OU</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-300">
              E-mail
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-slate-900 dark:text-slate-100"
              placeholder="voce@exemplo.com"
              type="email"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700 dark:text-slate-300">
              Senha
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-slate-900 dark:text-slate-100"
              placeholder="••••••••"
              type="password"
            />
          </div>

          <button
            onClick={loginEmail}
            disabled={loading}
            className="w-full h-11 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:opacity-90 transition disabled:opacity-60"
            type="button"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            href="/forgot-password"
            className="text-slate-600 dark:text-slate-400 hover:underline"
          >
            Esqueci minha senha
          </Link>

          <Link
            href="/register"
            className="text-slate-900 dark:text-slate-100 font-semibold hover:underline"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
