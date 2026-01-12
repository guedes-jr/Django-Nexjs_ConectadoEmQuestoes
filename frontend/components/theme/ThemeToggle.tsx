"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, effectiveTheme, setTheme } = useTheme();

  const toggle = () => {
    const next = effectiveTheme === "dark" ? "light" : "dark";
    setTheme(next);

    const html = document.documentElement;
    if (next === "dark") html.classList.add("dark");
    else html.classList.remove("dark");

    localStorage.setItem("cq_theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="h-8 w-8 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center"
      aria-label="Alternar tema"
      title={theme}
    >
      {effectiveTheme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
