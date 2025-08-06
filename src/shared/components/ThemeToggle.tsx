import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  isCollapsed?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isCollapsed = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
        text-gray-600 hover:bg-gray-50 hover:text-gray-900
        dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100
        ${isCollapsed ? 'justify-center px-2' : ''}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={isCollapsed ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : undefined}
    >
      <span className={`text-lg transition-colors duration-200 ${
        theme === 'light'
          ? 'text-[#e65100] group-hover:text-yellow-600'
          : 'text-blue-400 group-hover:text-blue-300'
      }`}>
        {theme === 'light' ? <FiSun /> : <FiMoon />}
      </span>
      {!isCollapsed && (
        <span className="font-medium">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
