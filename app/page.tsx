'use client';

import { toggleClass, getCurrentColorScheme } from './utils/theme';
import { useState } from 'react';

export default function Home() {
  const currentColorScheme = getCurrentColorScheme();

  const [theme, setTheme] = useState(currentColorScheme);

  function handleToggle() {
    if (theme == 'light') {
      toggleClass();
      setTheme('dark');
    } else {
      toggleClass();
      setTheme('light');
    }
  }

  return (
    <main className='flex min-h-screen items-center flex-col justify-center dark:bg-black'>
      <h1 className='text-2xl font-bold dark:text-white mb-12'>
        Theme switcher
      </h1>

      <div className='flex items-center justify-center space-x-4'>
        <button
          onClick={handleToggle}
          className='bg-black capitalize px-2 py-1 rounded-sm text-white font-medium hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100'
        >
          {theme}
        </button>

        <Dropdown />
      </div>
    </main>
  );
}

function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setOpen(!open)}
        type='button'
        className='bg-black capitalize px-2 py-1 rounded-sm text-white font-medium hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100'
        id='menu-button'
        aria-expanded='true'
        aria-haspopup='true'
      >
        Options
      </button>

      <div
        className={`${
          open
            ? 'absolute right-0 w-56 mt-2 origin-top-right bg-white border-2 border-gray-200 rounded-sm'
            : 'hidden'
        }`}
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='menu-button'
      >
        <button
          type='button'
          className='text-white font-medium hover:bg-gray-900 dark:bg-white bg-black dark:text-black group dark:hover:bg-gray-100 flex items-center w-full px-2 py-2 text-sm'
          role='menuitem'
          onClick={() => {
            toggleClass('system');
            setOpen(false);
          }}
        >
          System
        </button>
        <button
          type='button'
          className='text-white font-medium hover:bg-gray-900 dark:bg-white bg-black dark:text-black group dark:hover:bg-gray-100 flex items-center w-full px-2 py-2 text-sm'
          role='menuitem'
          onClick={() => {
            toggleClass('light');
            setOpen(false);
          }}
        >
          Light
        </button>
        <button
          type='button'
          className='text-white font-medium hover:bg-gray-900 dark:bg-white bg-black dark:text-black group dark:hover:bg-gray-100 flex items-center w-full px-2 py-2 text-sm'
          role='menuitem'
          onClick={() => {
            toggleClass('dark');
            setOpen(false);
          }}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
