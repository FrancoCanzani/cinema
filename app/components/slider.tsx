'use client';

import { NowPlayingMovieResponse } from '../utils/types';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCarousel({
  movies,
}: {
  movies: NowPlayingMovieResponse[];
}) {
  return (
    <div className='bg-gray-100 p-3 gap-y-4 flex flex-col'>
      <nav className='flex items-center justify-between'>
        <h2 className='font-semibold border-b-2 border-black w-fit'>
          Current movies
        </h2>
        <Link href={'#'} className='italic hover:underline text-sm'>
          See all
        </Link>
      </nav>
      <div className='flex w-full carousel space-x-3'>
        {movies.map((movie: NowPlayingMovieResponse) => (
          <div key={movie.id} className='carousel-item flex flex-col'>
            <Image
              alt='Movie poster'
              width={325}
              height={400}
              className='rounded-sm'
              priority
              src={`https://image.tmdb.org/t/p/w500${
                movie.poster_path ?? movie.backdrop_path
              }`}
            />
            <p className='py-2 h-10 text-xs'>{movie.title}</p>
            <Link
              href={'#'}
              className='text-orange-500 hover:underline font-semibold text-sm'
            >
              Buy Tickets
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
