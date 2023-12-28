import Image from 'next/image';
import { NowPlayingMovieResponse } from './utils/types';
import MovieDetails from './components/movieDetails';
import Link from 'next/link';

export default async function Home() {
  const url =
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();

  return (
    <main className='flex flex-col'>
      <section>
        <h2 className='border w-fit py-0.5 px-1 uppercase text-xs border-black font-semibold mb-6'>
          Movie List / Now Streaming
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {result.results.map((movie: NowPlayingMovieResponse) => (
            <div
              key={movie.id}
              className='w-full flex flex-col items-start justify-center mb-4 gap-x-4 md:flex-row'
            >
              <div className='w-full md:w-1/2'>
                <Link
                  href={`/movies/${movie.id}`}
                  className='font-semibold group text-xl hover:underline'
                >
                  {movie.title}{' '}
                  <span className='group-hover:visible invisible'>↗</span>
                </Link>
                <div className='w-full flex justify-start mt-2 mb-6'>
                  <MovieDetails movieId={movie.id} />
                </div>
                <div className='w-full flex justify-end my-4'>
                  <p className='text-sm md:max-w-[30ch] w-full leading-normal text-ellipsis overflow-hidden'>
                    {movie.overview}
                  </p>
                </div>
              </div>
              <div className='w-full md:w-1/2'>
                <Image
                  alt='Movie poster'
                  width={650}
                  height={1050}
                  className='rounded-sm'
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path ?? movie.backdrop_path
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
