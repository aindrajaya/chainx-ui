"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize from DOM class/localStorage to avoid mismatch
  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    // Check localStorage first, then system preference
    const stored = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = (stored === "dark" || stored === "light")
      ? stored as "light" | "dark"
      : (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Toggle theme" className="shrink-0">
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="shrink-0">
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;