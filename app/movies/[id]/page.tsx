import { NowPlayingMovieResponse, MovieProps } from '@/app/utils/types';
import Image from 'next/image';
import Cast from '@/app/components/cast';
import YoutubeTag from '@/app/components/youtubeTag';

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
        <div className='flex items-center justify-center space-x-2'>
          <YoutubeTag movieId={movie.id} />
          <a href={movie.homepage} target='_blank'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1.5em'
              height='1.5em'
              viewBox='0 0 717 707'
            >
              <path
                fill='currentColor'
                d='M0 342v-1C9 225 51 138 124 83C196 27 274 0 359 0c89-1 172 29 246 89c75 59 112 147 112 261v7c0 115-37 201-112 260c-75 60-158 90-247 90h-4c-87-1-167-31-241-91C39 557 1 466 0 342m337-157V27h-24c-5 6-9 13-13 19s-8 12-12 19c-4 6-9 14-12 20c-4 6-7 12-10 19c-6 10-11 20-15 29c-5 9-9 18-12 26c6 4 13 9 21 12c9 3 18 6 27 8c10 2 19 3 27 4c9 1 17 2 23 2m42-158v157c5 0 11 1 17 0c6 0 13-1 19-2c11-2 24-5 34-8c11-4 21-9 28-15c-12-29-25-52-38-74s-28-41-44-57v-1zm-108 9v-1c-7 3-14 8-22 11c-7 3-16 7-23 11c-14 7-28 15-42 24c-13 9-26 19-37 29c4 4 9 8 13 11s9 7 14 11c4 2 9 5 14 9c5 3 11 7 17 11c8-18 16-37 26-54c10-18 21-35 32-50c1-2 2-4 4-6c1-1 2-4 4-6m306 74v-1c-25-19-47-35-69-45s-44-20-64-28c16 16 30 36 39 55c10 20 20 41 28 61c4-2 9-4 15-8c5-3 12-6 18-9c6-4 11-8 17-12c6-5 12-9 16-13m-17 223h115c0-37-8-72-23-108c-14-35-34-64-59-89v-1c-5 8-12 15-19 20c-8 5-15 9-23 13c-5 3-10 7-15 9c-5 3-12 5-17 8c4 8 8 17 12 25c3 9 8 19 10 28c6 16 10 33 14 50c3 15 5 31 5 45M198 185v-1c-8-4-17-7-24-11c-7-5-14-10-20-14c-6-3-12-7-17-11s-9-8-13-12c-26 25-45 53-57 86c-13 33-22 70-26 110h123c0-28 4-55 11-82c6-28 15-49 23-65m139 147V217c-8 1-18 1-27 0c-10-1-20-4-29-7c-8-2-18-4-26-7c-9-2-18-6-25-10c-6 10-11 22-15 35c-5 12-8 25-11 37c-2 12-3 25-4 36s-2 22-2 31zm42-113v113h148c0-6 0-13-1-21c-2-7-3-16-4-24c-3-12-6-25-10-37c-4-11-8-22-13-31c-2-5-4-11-6-15c-3-5-6-8-8-11c-11 8-26 13-44 17c-17 4-37 8-55 9zM164 365H41c0 17 3 36 8 59c5 24 15 46 26 70c5 12 11 24 17 36c7 11 15 23 23 34c6-4 12-7 17-10c6-3 13-7 19-10c7-3 14-6 22-10c7-3 16-7 25-11c-8-25-17-49-23-76c-7-26-11-52-11-81zm173 117V365H198c0 8 1 20 3 32c1 12 4 25 6 38c4 14 7 28 11 40s8 22 12 31c18-7 36-12 48-15c13-4 25-7 37-8h11c4-1 8-1 11-1m42-117v116c7 1 15 2 23 3c9 1 20 3 29 5l15 3c5 2 11 3 16 4c6 2 12 3 18 5c5 2 10 3 14 5c13-33 21-60 26-83c5-22 7-41 7-57v-1zm296 1v-1H560v6c-1 19-4 41-8 64c-4 22-13 48-25 80c16 8 31 16 43 24s23 17 31 25c17-17 32-40 45-70c13-29 22-59 27-91c1-6 1-12 2-18zM337 670V514c-25 4-46 9-62 13s-28 8-36 12c6 15 12 28 18 40c6 11 13 23 19 33c2 4 6 8 9 13c3 4 5 9 8 13c3 5 6 11 9 17c4 5 7 11 11 15zm42 0h23c9-7 18-17 25-28c8-11 17-24 23-35c7-13 14-25 20-37s11-23 15-31c-11-4-26-8-41-12s-36-8-65-12zm198-82v-1c-2-3-6-7-9-10s-8-7-13-10c-4-3-9-6-15-9s-14-7-21-11c-4 8-11 22-21 41c-9 19-25 42-45 67c25-4 47-13 67-25c22-11 41-26 57-42m-372-32v-1c-7 4-18 9-29 14c-12 5-25 11-37 19c7 6 14 12 20 16c6 5 13 9 19 13c11 7 24 14 37 20s29 12 49 18c-7-8-12-18-17-26s-11-16-16-24s-9-17-13-25c-5-8-9-16-13-24'
              />
            </svg>
          </a>
        </div>
      </div>
      <h3 className='italic text-sm'>{movie.tagline}</h3>
      <div className='flex w-full justify-start flex-col md:flex-row items-start gap-x-4 mt-8'>
        <section className='w-full md:w-2/5'>
          <p className='text-sm w-full mb-3 max-w-prose leading-normal text-ellipsis overflow-hidden'>
            {movie.overview}
          </p>
          <Image
            alt='Movie poster'
            width={545}
            height={900}
            priority
            className='rounded-sm'
            src={`https://image.tmdb.org/t/p/w780${
              movie.poster_path ?? movie.backdrop_path
            }`}
          />
        </section>
        <section className='w-full h-full flex items-start flex-col justify-start md:w-3/5'>
          <Cast movieId={params.id} />
          <h2 className='border w-fit mt-6 py-0.5 px-1 uppercase text-xs border-black font-semibold mb-6'>
            Producers
          </h2>
          <ul className='flex items-center justify-start flex-wrap gap-5'>
            {movie.production_companies.map((company) => (
              <li key={company.id}>
                {company.logo_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w342${company.logo_path}`}
                    width={100}
                    height={80}
                    alt={company.name}
                  />
                ) : (
                  <p className='text-lg font-semibold'>{company.name}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
