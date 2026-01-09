"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  effectiveTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "cq_theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyHtmlTheme(effective: "light" | "dark") {
  const root = document.documentElement;
  if (effective === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    () => (typeof window !== "undefined" ? getSystemTheme() : "light")
  );

  // Inicializa a preferência a partir do localStorage (somente no client)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = saved ?? "system";
    setThemeState(initial);

    const sys = getSystemTheme();
    setEffectiveTheme(initial === "system" ? sys : (initial as "light" | "dark"));
    applyHtmlTheme(initial === "system" ? sys : (initial as "light" | "dark"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Observa mudanças no prefers-color-scheme quando em "system"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const sys = mq.matches ? "dark" : "light";
      if (theme === "system") {
        setEffectiveTheme(sys);
        applyHtmlTheme(sys);
      }
    };

    mq.addEventListener?.("change", handleChange);
    // fallback para navegadores que ainda usam addListener
    if ((mq as any).addListener) (mq as any).addListener(handleChange);

    return () => {
      mq.removeEventListener?.("change", handleChange);
      if ((mq as any).removeListener) (mq as any).removeListener(handleChange);
    };
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    const eff = t === "system" ? getSystemTheme() : (t as "light" | "dark");
    setEffectiveTheme(eff);
    applyHtmlTheme(eff);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next =
        prev === "dark" ? "light" : prev === "light" ? "system" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      const eff = next === "system" ? getSystemTheme() : (next as "light" | "dark");
      setEffectiveTheme(eff);
      applyHtmlTheme(eff);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, effectiveTheme }),
    [theme, setTheme, toggleTheme, effectiveTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}