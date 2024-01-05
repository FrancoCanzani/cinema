import { NowPlayingMovieResponse } from '../utils/types';
import Link from 'next/link';

export default function SelectedMovie({
  selectedMovie,
}: {
  selectedMovie: {
    movie: NowPlayingMovieResponse;
    day: string;
    time: string;
  } | null;
}) {
  if (!selectedMovie) {
    return null;
  }

  return (
    <div className='w-full shadow sticky top-0 p-3 text-sm space-x-3 flex items-center justify-between bg-gradient-to-r from-white via-gray-50 to-gray-100'>
      <div className='flex items-center w-full justify-start flex-col space-y-2'>
        <span className='text-start w-full'>
          Movie: <strong>{selectedMovie.movie?.title}</strong>
        </span>
        <div className='flex w-full items-center justify-between'>
          <div className='space-x-3 flex justify-start items-center'>
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
              {selectedMovie.day}
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
              {selectedMovie.time}
            </span>
          </div>
          <Link
            href={'/checkout'}
            className='flex font-semibold justify-center items-center gap-x-2'
          >
            <span className='hover:underline'>Checkout</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
            >
              <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              >
                <path d='M17 13V5a2 2 0 0 0-2-2h-2m0 0H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7M13 3v10.5M9 7v3' />
                <path
                  fill='currentColor'
                  d='M18.948 9.95L16.998 8v6.587c0 .89-1.077 1.337-1.707.707L13.996 14c-.5-.5-1.701-.8-2.502 0c-.8.8-.5 2 0 2.5l4.918 4.915a2 2 0 0 0 1.414.585H20a1 1 0 0 0 1-1v-6.1a7 7 0 0 0-2.052-4.95'
                />
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
