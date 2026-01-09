"use client";

import { FormEvent, useMemo, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { http, BACKEND_URL } from "@/lib/http";

type LoginState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<LoginState>({ status: "idle" });

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0;
  }, [email, password]);

  const loginWithGoogle = () => {
    window.location.href = `${BACKEND_URL}/accounts/google/login/`;
  };

  const loginWithEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setState({ status: "loading" });

    try {
      await http.post("/api/auth/login/", {
        email: email.trim(),
        password,
      });

      window.location.href = "/dashboard";
    } catch (err: any) {
      const msg =
        err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.detail ||
        "Não foi possível entrar. Verifique seu e-mail e senha.";
      setState({ status: "error", message: String(msg) });
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 px-8 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
              <span className="text-xl font-bold">CQ</span>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Bem-vindo ao Conectado em Questões de Concursos
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Faça login para continuar
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center justify-center gap-3 font-medium text-slate-800"
            >
              <GoogleIcon />
              Continuar com Google
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400 font-semibold tracking-widest">
              OU
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={loginWithEmail} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-300"
                />
              </div>
            </div>

            {state.status === "error" && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || state.status === "loading"}
              className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.status === "loading" ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <a
              href={`${BACKEND_URL}/accounts/password/reset/`}
              className="text-slate-500 hover:text-slate-900"
            >
              Esqueceu a senha?
            </a>

            <div className="text-slate-500">
              Não tem uma conta?{" "}
              <a
                href={`${BACKEND_URL}/accounts/signup/`}
                className="font-semibold text-slate-900 hover:underline"
              >
                Cadastre-se
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Conectado em Questões
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.658 32.657 29.213 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.247 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 19.01 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.247 4 24 4c-7.682 0-14.344 4.327-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.115 0 9.83-1.961 13.373-5.145l-6.175-5.224C29.161 35.091 26.715 36 24 36c-5.192 0-9.625-3.32-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.207-2.231 4.077-4.105 5.369l.003-.002 6.175 5.224C36.94 39.021 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
