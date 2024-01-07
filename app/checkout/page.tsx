'use client';

import { NowPlayingMovieResponse } from '../utils/types';
import Invoice from '../components/invoice';

export default function Checkout() {
  if (typeof window == undefined) {
    return;
  }

  const storedItem = sessionStorage.getItem('selectedMovie');
  const storedObj = storedItem ? JSON.parse(storedItem) : null;
  const movie: NowPlayingMovieResponse = storedObj?.movie;

  return (
    <main className='px-3 py-6 flex items-center justify-start flex-col'>
      <h1 className='font-semibold text-xl text-left w-full underline mb-6'>
        Checkout
      </h1>
      <div className='flex w-full items-center justify-start flex-col mb-6'>
        <h2 className='w-full'>
          Movie: <strong>{movie.title}</strong>
        </h2>
        <div className='flex w-full items-center justify-start space-x-3'>
          <span className='flex font-semibold justify-center items-center gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z'
              />
            </svg>
            {storedObj.day}
          </span>
          <span className='flex font-semibold justify-center items-center gap-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12h-8V4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20'
              />
            </svg>
            {storedObj.time}
          </span>
        </div>
      </div>
      <Invoice />
    </main>
  );
}
