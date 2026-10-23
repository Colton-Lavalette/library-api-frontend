import { useEffect, useState } from 'react';
import './ThemeToggle.css';

type Theme = 'light' | 'night';
const STORAGE_KEY = 'library-theme';

const readInitial = (): Theme =>
    localStorage.getItem(STORAGE_KEY) === 'night' ? 'night' : 'light';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>(readInitial);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const next: Theme = theme === 'light' ? 'night' : 'light';

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(next)}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
        >
            {theme === 'light' ? '☾' : '☀'}
        </button>
    );
};

export default ThemeToggle;
