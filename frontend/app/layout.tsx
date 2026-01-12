import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem("cq_theme") || "system";
    var isDark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var html = document.documentElement;
    if (isDark) html.classList.add("dark");
    else html.classList.remove("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
