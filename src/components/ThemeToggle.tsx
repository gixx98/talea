'use client'
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored as 'light' | 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="flex items-center gap-2 px-3 py-2 rounded-full border transition-colors opacity-0">
        <Sun className="w-5 h-5" />
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  const isLight = theme === 'light';
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
      style={{
        borderColor: 'var(--borderColor)',
        background: 'var(--background)',
        color: 'var(--foreground)',
        boxShadow: 'var(--shadow)',
      }}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      <div className="relative flex items-center gap-2">
        {/* Active background indicator */}
        <div
          className={`absolute rounded-full transition-all duration-300 ${
            isLight 
              ? 'bg-[var(--color-4)] left-0 opacity-90' 
              : 'bg-[var(--color-9)] left-7 opacity-90'
          }`}
          style={{
            width: '32px',
            height: '32px',
            transform: isLight ? 'translateX(-6px)' : 'translateX(-6px)',
          }}
        />
        
        <Sun
          className={`w-5 h-5 transition-all duration-300 z-10 ${
            isLight 
              ? 'text-[var(--color-9)] scale-110' 
              : 'text-[var(--color-9)] scale-100'
          }`}
        />
        <Moon
          className={`w-5 h-5 transition-all duration-300 z-10 ${
            isDark 
              ? 'text-[var(--color-4)] scale-110' 
              : 'text-[var(--color-4)] scale-100'
          }`}
        />
      </div>
    </button>
  );
}