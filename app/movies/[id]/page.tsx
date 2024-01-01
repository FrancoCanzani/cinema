import { NowPlayingMovieResponse, MovieProps } from '@/app/utils/types';
import Image from 'next/image';
import Cast from '@/app/components/cast';
import Link from 'next/link';

export async function generateStaticParams() {
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
  const movies = await response.json();
  return movies.results.map((movie: NowPlayingMovieResponse) => ({
    slug: movie.id,
  }));
}

export default async function Movie({ params }: { params: { id: string } }) {
  const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const movie: MovieProps = await response.json();

  return (
    <main className='px-3 py-6'>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold group text-xl underline'>{movie.title}</h1>
        <Link
          href={'#'}
          className='bg-orange-500 px-2 py-1 border-2 shadow border-black font-semibold hover:bg-orange-400 text-sm'
        >
          Buy Ticket
        </Link>
      </div>
      <h3 className='italic text-sm'>{movie.tagline}</h3>
      <div className='flex justify-start items-start gap-x-4 mt-8'>
        <section className='w-full xl:w-2/5'>
          <p className='text-sm w-full mb-3 max-w-prose leading-normal text-ellipsis overflow-hidden'>
            {movie.overview}
          </p>
          <Image
            alt='Movie poster'
            width={545}
            height={900}
            priority
            className='rounded-sm'
            src={`https://image.tmdb.org/t/p/w500${
              movie.poster_path ?? movie.backdrop_path
            }`}
          />
        </section>
        <section className='w-full h-full flex items-start justify-start xl:w-3/5'>
          <Cast movieId={params.id} />
        </section>
      </div>
    </main>
  );
}
