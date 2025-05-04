import React from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  );

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="px-2 py-1 rounded border ml-2">
      {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeSwitcher; 