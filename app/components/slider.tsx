import React from 'react';
import { NowPlayingMovieResponse } from '../utils/types';
import Link from 'next/link';

export default function MovieCarousel({
  movies,
}: {
  movies: NowPlayingMovieResponse[];
}) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const today = new Date();
  const currentDayIndex = today.getDay();
  const nextDays = Array.from(
    { length: 3 },
    (_, i) => (currentDayIndex + i) % 7
  );

  return (
    <div className='relative'>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-max'>
          <thead className='text-xs border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th
                scope='col'
                className='p-4 border-r-2 md:sticky md:left-0 bg-white'
              >
                Movie
              </th>
              {nextDays.map((dayIndex, index) => (
                <th
                  key={index}
                  className={`${
                    index === 0 && 'bg-gray-200 rounded-sm'
                  } px-4 border py-2`}
                >
                  {daysOfWeek[currentDayIndex + index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie: NowPlayingMovieResponse) => (
              <tr
                key={movie.id}
                className='even:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white md:sticky md:left-0 bg-white'
                >
                  <Link
                    href={`/movies/${movie.id}`}
                    className='text-sm font-semibold hover:underline'
                  >
                    {movie.title}
                  </Link>
                </th>
                {nextDays.map((dayIndex, index) => (
                  <td key={index} className='px-4 py-2 border'>
                    <div className='space-x-2'>
                      <button className='bg-black rounded-sm px-2 py-1 text-white hover:text-gray-200'>
                        17:15
                      </button>
                      <button className='bg-black rounded-sm px-2 py-1 text-white hover:text-gray-200'>
                        20:00
                      </button>
                      {movie.popularity > 400 && (
                        <button className='bg-black rounded-sm px-2 py-1 text-white hover:text-gray-200'>
                          22:30
                        </button>
                      )}
                      {movie.popularity > 700 && (
                        <button className='bg-black rounded-sm px-2 py-1 text-white hover:text-gray-200'>
                          00:15
                        </button>
                      )}{' '}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
