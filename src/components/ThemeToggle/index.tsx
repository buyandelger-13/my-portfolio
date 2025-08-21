import { MoonIcon, SunIcon } from "@phosphor-icons/react";
const ThemeToggle: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? <MoonIcon size={24} /> : <SunIcon size={24} />}
  </button>
);

export default ThemeToggle;