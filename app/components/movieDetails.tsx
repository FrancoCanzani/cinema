'use client';

import { useEffect, useState } from 'react';
import convertRuntime from '../utils/convertRuntime';
import formatCurrency from '../utils/formatCurrency';
import { MovieProps } from '../utils/types';

export default function MovieDetails({ movieId }: { movieId: number }) {
  const [movie, setMovie] = useState<MovieProps | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      const url = `https://api.themoviedb.org/3/movie/${movieId}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [movieId]);

  interface GenreProps {
    id: number;
    name: string;
  }

  if (!movie) {
    return;
  }

  return (
    <div>
      <ul className='w-full flex justify-start'>
        {movie.genres.map((genre: GenreProps, index: number) => (
          <li key={genre.id} className='mr-1 text-sm italic'>
            {genre.name}
            {index !== movie.genres.length - 1 && ', '}
          </li>
        ))}
      </ul>
      <p className='text-sm'>
        {movie.release_date} / {convertRuntime(movie.runtime)}
        {movie.budget > 0 && ` / ${formatCurrency(movie.budget)}`}
      </p>
    </div>
  );
}
