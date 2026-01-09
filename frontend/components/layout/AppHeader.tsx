"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "Meu Painel", href: "/dashboard" },
  { label: "Questões", href: "/questions" },
  { label: "Provas", href: "/exams" },
  { label: "ChatGPT", href: "/chat" },
  { label: "Área de Estudos", href: "/study" },
  { label: "Planos", href: "/plans" },
  { label: "Mais", href: "/more" },
];

type Props = {
  userName?: string;
};

export function AppHeader({ userName }: Props) {
  const pathname = usePathname();

  return (
    <header className="bg-blue-600 dark:bg-blue-700 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo + Nome */}
          <div className="flex items-center gap-3 min-w-[240px]">
            <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center font-bold">
              CQ
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">
                Conectado em Concursos Públicos SE
              </div>
              <div className="text-xs text-white/80">★★★★★</div>
            </div>
          </div>

          {/* Navegação */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                    active
                      ? "bg-white/15"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Ações do usuário */}
          <div className="flex items-center gap-3 min-w-[240px] justify-end">
            {/* Upload / ação */}
            <button
              type="button"
              className="h-9 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-sm"
              title="Enviar"
            >
              ⬆
            </button>

            {/* Notificações */}
            <button
              type="button"
              className="relative h-9 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-sm"
              title="Notificações"
            >
              🔔
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center">
                9+
              </span>
            </button>

            {/* Toggle de tema */}
            <ThemeToggle />

            {/* Usuário */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
              <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs">
                👤
              </div>
              <div className="text-sm font-medium truncate max-w-[160px]">
                {userName || "Usuário"}
              </div>
            </div>

            {/* Plano */}
            <span className="hidden md:inline text-xs bg-white/10 px-3 py-1 rounded-lg">
              Plano Gratuito
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
