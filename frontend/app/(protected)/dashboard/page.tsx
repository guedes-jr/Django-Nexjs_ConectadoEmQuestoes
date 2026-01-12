"use client";

import { useEffect, useMemo } from "react";
import { AppFooter } from "@/components/layout/AppFooter";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { HeroActions } from "@/components/dashboard/HeroActions";
import { Performance7Days } from "@/components/dashboard/Performance7Days";
import { PerformanceByDiscipline } from "@/components/dashboard/PerformanceByDiscipline";
import { AppearanceCard } from "@/components/dashboard/AppearanceCard";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useMe } from "@/lib/useMe";

export default function DashboardPage() {
  const { me, isLoading } = useMe();

  const { theme: selectedTheme, effectiveTheme } = useTheme();

  const fullName = useMemo(() => {
    if (!me) return "Usuário";
    const name = `${me.first_name || ""} ${me.last_name || ""}`.trim();
    return name || me.username || "Usuário";
  }, [me]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cq_theme");
      const htmlHas = document.documentElement.classList.contains("dark");
      const bodyHas = document.body.classList.contains("dark");
      document.body.setAttribute("data-effective-theme", effectiveTheme);
      console.info(
        "[THEME DEBUG] stored:",
        stored,
        "selected:",
        selectedTheme,
        "effective:",
        effectiveTheme
      );
      console.info("[THEME DEBUG] htmlHasDark:", htmlHas, "bodyHasDark:", bodyHas);
    } catch {
      /* noop */
    }
  }, [selectedTheme, effectiveTheme]);

  const resolveNow = () => {
    alert("Aqui você vai abrir a tela de questões.");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          <HeroActions
            greeting={isLoading ? "Carregando..." : `Boa tarde, ${fullName}!`}
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
