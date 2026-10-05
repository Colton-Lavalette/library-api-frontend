import { useState } from "react";
import "./ThemeToggle.css";

type Theme = "system" | "light" | "dark";
const KEY = "theme";

function readTheme(): Theme {
    try {
        const v = localStorage.getItem(KEY);
        if (v === "light" || v === "dark") return v;
    } catch {
        /* storage unavailable */
    }
    return "system";
}

function applyTheme(t: Theme) {
    const root = document.documentElement;
    if (t === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", t);
    try {
        if (t === "system") localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, t);
    } catch {
        /* still applied for this visit */
    }
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(readTheme);
    return (
        <label className="theme-toggle">
            <span className="visually-hidden">Theme</span>
            <select
                value={theme}
                onChange={(e) => {
                    const t = e.target.value as Theme;
                    setTheme(t);
                    applyTheme(t);
                }}
            >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>
    );
}