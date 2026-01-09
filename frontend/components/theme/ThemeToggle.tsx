"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-pressed={mounted ? isDark : undefined}
      title={
        mounted ? `Tema atual: ${theme} (efetivo: ${effectiveTheme})` : "Alterar tema"
      }
      className="h-9 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-sm flex items-center gap-2 select-none"
    >
      <span aria-hidden className="text-sm">
        {mounted ? (isDark ? "🌙" : "☀️") : "🌗"}
      </span>
      <span className="hidden sm:inline">
        {mounted ? (isDark ? "Escuro" : "Claro") : "Tema"}
      </span>
    </button>
  );
}

export default ThemeToggle;
