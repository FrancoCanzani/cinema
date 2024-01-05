'use client';

import { useState } from 'react';
import { NowPlayingMovieResponse } from '../utils/types';
import Link from 'next/link';
import Image from 'next/image';
import MovieDetails from './movieDetails';
import getDayAndDate from '../utils/getDayAndDate';
import TimeButton from './buttons/timeButton';
import SelectedMovie from './selectedMovie';

export default function MoviePicker({
  movies,
}: {
  movies: NowPlayingMovieResponse[];
}) {
  const days: string[] = Array.from({ length: 7 }, (_, i) => getDayAndDate(i));
  const today = days[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMovie, setSelectedMovie] = useState<{
    movie: NowPlayingMovieResponse;
    day: string;
    time: string;
  } | null>(null);

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex items-center overflow-x-auto justify-start border-b w-full'>
        {days.map((day, index) => (
          <button
            onClick={() => setSelectedDate(day)}
            key={index}
            className={`${
              day === selectedDate && 'bg-[#232323] text-white border-[#232323]'
            } px-4 font-semibold border py-2`}
          >
            {day}
          </button>
        ))}
      </div>
      <SelectedMovie selectedMovie={selectedMovie} />
      <ul className='w-full'>
        {movies.map((movie: NowPlayingMovieResponse) => (
          <li
            key={movie.id}
            className='even:bg-gray-100 grid auto-cols-min auto-rows-min grid-cols-[80px,1fr] gap-4 sm:grid-cols-[112px,1fr] last:border-b-0 border-b px-5 sm:px-8 py-10'
          >
            <Image
              alt={`${movie.title}`}
              width={150}
              height={350}
              className='rounded-sm'
              src={`https://image.tmdb.org/t/p/w500${
                movie.poster_path ?? movie.backdrop_path
              }`}
            />
            <div className='text-gray-900'>
              <Link
                href={`/movies/${movie.id}`}
                className='text-sm font-semibold hover:underline'
              >
                {movie.title}
              </Link>
              <MovieDetails movieId={movie.id} />
              <div className='flex items-center space-x-3 mt-6'>
                <TimeButton
                  time='17:15'
                  selectedDate={selectedDate}
                  today={today}
                  movie={movie}
                  selectedMovie={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                />
                <TimeButton
                  time='20:30'
                  selectedDate={selectedDate}
                  today={today}
                  movie={movie}
                  selectedMovie={selectedMovie}
                  setSelectedMovie={setSelectedMovie}
                />
                {movie.popularity > 400 && (
                  <TimeButton
                    time='22:00'
                    selectedDate={selectedDate}
                    today={today}
                    movie={movie}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                  />
                )}
                {movie.popularity > 600 && (
                  <TimeButton
                    time='23:30'
                    selectedDate={selectedDate}
                    today={today}
                    movie={movie}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
