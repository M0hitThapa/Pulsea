"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ModeToggle = () => {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const SWITCH_THEME = () => {
    switch (theme) {
      case "light": {
        setTheme("dark");
        return;
      }
      case "dark": {
        setTheme("light");
        return;
      }
      case "system": {
        setTheme(systemTheme === "dark" ? "light" : "dark");
        return;
      }
    }
  };

  return (
    <button
      onClick={SWITCH_THEME}
      className="relative size-6 items-center justify-center"
    >
      <Moon className="absolute inset-0 size-6 shrink-0 scale-0 rotate-45 transition-all duration-300 dark:scale-100 dark:rotate-0 dark:text-neutral-200" />
      <Sun className="absolute inset-0 size-6 shrink-0 scale-100 text-neutral-500 transition-all duration-300 dark:scale-0 dark:rotate-45" />
    </button>
  );
};
