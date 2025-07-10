import { useState, useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || savedTheme === 'light')
      setTheme(savedTheme);
    else
      setTheme(systemPrefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    // if (theme === 'dark')
    //   document.documentElement.classList.add('dark');
    // else
    //   document.documentElement.classList.remove('dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 font-sans transition-colors duration-300 relative z-0">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <MainContent />
      </div>
    </>
  );
}