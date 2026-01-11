"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useMe } from "@/lib/useMe";

const NAV = [
  { label: "Meu Painel", href: "/dashboard" },
  { label: "Questões", href: "/questions" },
  { label: "Provas", href: "/exams" },
  { label: "ChatGPT", href: "/chat" },
  { label: "Área de Estudos", href: "/study" },
  { label: "Planos", href: "/plans" },
];

function getInitialsFromText(text: string) {
  const clean = (text || "").trim();
  if (!clean) return "U";

  const parts = clean
    .replace(/[^a-zA-Z0-9À-ÿ\s._-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function pickDisplayName(me: any) {
  const full =
    [me?.first_name, me?.last_name].filter(Boolean).join(" ").trim() || "";
  if (full) return full;
  if (me?.username) return String(me.username);
  if (me?.email) return String(me.email);
  return "Usuário";
}

function normalizeAvatarUrl(url: string | null) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    return `${base.replace(/\/$/, "")}${trimmed}`;
  }

  return trimmed;
}


export function AppHeader() {
  const pathname = usePathname();
  const [openMore, setOpenMore] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const me = useMe();

  const displayName = useMemo(() => pickDisplayName(me), [me]);
  const initials = useMemo(() => getInitialsFromText(displayName), [displayName]);

  const avatarUrl = useMemo(() => {
    const uploaded = normalizeAvatarUrl(me?.avatar ?? null);
    if (uploaded) return uploaded;

    const social = normalizeAvatarUrl(me?.social_avatar ?? null);
    if (social) return social;

    return null;
  }, [me]);

  const logout = () => {
    window.location.href = "http://localhost:8000/accounts/logout/";
  };

  return (
    <header className="bg-blue-600 text-white h-14 flex items-center relative">
      <div className="absolute left-4 flex items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center font-bold">
          📘
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">
            Conectado em Concursos Públicos SE
          </div>
          <div className="text-[11px] text-white/80">★★★★★</div>
        </div>
      </div>

      <nav className="mx-auto hidden lg:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                active
                  ? "bg-white text-blue-600 font-semibold"
                  : "hover:bg-white/20"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="relative">
          <button
            onClick={() => setOpenMore((v) => !v)}
            className="px-3 py-1.5 text-sm rounded-md hover:bg-white/20"
            type="button"
          >
            Mais ▾
          </button>

          {openMore && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden">
              <Link href="/ranking" className="block px-4 py-2 hover:bg-gray-100">
                Ranking
              </Link>
              <Link
                href="/estatisticas"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Estatísticas
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="absolute right-4 flex items-center gap-2">
        <button
          className="relative h-8 w-8 rounded-md bg-white/10 hover:bg-white/20"
          type="button"
        >
          🔔
          <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-red-500 rounded-full flex items-center justify-center">
            9+
          </span>
        </button>

        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setOpenUser((v) => !v)}
            className="flex flex-col items-center"
            type="button"
          >
            <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
              <div className="h-7 w-7 rounded-full bg-white/20 overflow-hidden flex items-center justify-center text-xs font-bold">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Foto de perfil"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-white">{initials}</span>
                )}
              </div>

              <div className="text-sm font-medium truncate max-w-[160px]">
                {me?.username || "Usuário"}
              </div>
            </div>
          </button>

          {openUser && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Meu Perfil
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                type="button"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
