import React from 'react';
import { useRadioStore } from '../store/radioStore';
import { SunIcon, MoonIcon, ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { theme, setTheme, layout, setLayout } = useRadioStore();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">

          <h1 className="text-xl font-bold">📻 RadioCubana</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLayout('list')}
            className={`p-2 rounded-lg transition ${layout === 'list' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            aria-label="Vista lista"
          >
          <ListBulletIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setLayout('grid')}
            className={`p-2 rounded-lg transition ${layout === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            aria-label="Vista cuadrícula"
          >
          <Squares2X2Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;