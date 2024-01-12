'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NowPlayingMovieResponse } from '../utils/types';

export default function Movie({ movie }: { movie: NowPlayingMovieResponse }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className='relative w-full hover:scale-95 transition ease-in-out duration-300 max-w-md rounded-lg overflow-hidden'
    >
      <Image
        alt={movie.title}
        className='w-full h-full object-cover'
        height='400'
        src={`https://image.tmdb.org/t/p/w780${
          movie.poster_path ?? movie.backdrop_path
        }`}
        style={{
          aspectRatio: '200/250',
          objectFit: 'cover',
        }}
        width='400'
      />
      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4'>
        <h2 className='text-xl font-bold text-white'>{movie.title}</h2>
        <p className='text-sm text-gray-200 line-clamp-3'>{movie.overview}</p>
      </div>
    </Link>
  );
}
