export type ThemeMode = 'dark' | 'light';

const THEME_KEY = 'vanguard_theme_preference';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  if (saved === 'dark' || saved === 'light') return saved;
  // Default to dark mode for luxury performance aesthetic
  return 'dark';
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(THEME_KEY, theme);
}
