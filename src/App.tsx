
import React, { useState, useEffect } from 'react';
import './App.css';
import ClassesList from './components/ClassesList';
import Topbar from './Topbar';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          return savedTheme === 'dark';
        }
      }
      return true;
    });
  
    useEffect(() => {
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, [isDarkMode]);
  
    const toggleTheme = () => {
      setIsDarkMode(prevMode => !prevMode);
    };
  return (
    <div>
      <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <ClassesList isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;

