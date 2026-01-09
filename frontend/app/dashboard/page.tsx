"use client";

import { useEffect, useMemo, useState } from "react";
import { http } from "@/lib/http";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { HeroActions } from "@/components/dashboard/HeroActions";
import { Performance7Days } from "@/components/dashboard/Performance7Days";
import { PerformanceByDiscipline } from "@/components/dashboard/PerformanceByDiscipline";
import { AppearanceCard } from "@/components/dashboard/AppearanceCard";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { useTheme } from "@/components/theme/ThemeProvider";

type User = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // DEBUG: tema (do ThemeProvider)
  const { theme: selectedTheme, effectiveTheme } = useTheme();

  const fullName = useMemo(() => {
    if (!user) return "Usuário";
    const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    return name || user.username || "Usuário";
  }, [user]);

  useEffect(() => {
    // Repare: http deve estar configurado com withCredentials: true
    let mounted = true;
    http
      .get("/api/auth/user/")
      .then((res) => {
        if (!mounted) return;
        setUser(res.data);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // DEBUG logs para ajudar a diagnosticar tema
    try {
      const stored = localStorage.getItem("cq_theme");
      const htmlHas = document.documentElement.classList.contains("dark");
      const bodyHas = document.body.classList.contains("dark");
      document.body.setAttribute("data-effective-theme", effectiveTheme);
      console.info("[THEME DEBUG] stored:", stored, "selected:", selectedTheme, "effective:", effectiveTheme);
      console.info("[THEME DEBUG] htmlHasDark:", htmlHas, "bodyHasDark:", bodyHas);
    } catch (e) {
      /* noop */
    }
  }, [selectedTheme, effectiveTheme]);

  const logout = () => {
    window.location.href = "http://localhost:8000/accounts/logout/";
  };

  const resolveNow = () => {
    alert("Aqui você vai abrir a tela de questões.");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AppHeader userName={fullName} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Meu Painel
          </div>
          <button
            onClick={logout}
            className="h-10 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <HeroActions
            greeting={loading ? "Carregando..." : `Boa tarde, ${fullName}!`}
            quote="A persistência transforma sonhos em conquistas. Você está no caminho certo."
            onResolve={resolveNow}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Questões Hoje"
              value="0"
              subtitle="+0% do total"
              icon="📄"
              iconBg="bg-blue-600"
            />
            <StatsCard
              title="Taxa de Acerto"
              value="0%"
              subtitle="Média geral"
              icon="🎯"
              iconBg="bg-green-600"
            />
            <StatsCard
              title="Streak Atual"
              value="0 dias"
              subtitle="Dias consecutivos"
              icon="🔥"
              iconBg="bg-orange-500"
            />
            <StatsCard
              title="Total de Questões"
              value="0"
              subtitle="Questões resolvidas"
              icon="🏅"
              iconBg="bg-purple-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Performance7Days />
              <PerformanceByDiscipline />
            </div>

            <div className="space-y-6">
              <AppearanceCard />
              <QuickLinks />
            </div>
          </div>
        </div>

        <AppFooter onResolveNow={resolveNow} />
      </div>
    </div>
  );
}