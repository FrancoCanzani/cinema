import { NowPlayingMovieResponse, ActorInfo } from '@/app/utils/types';
import Image from 'next/image';

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
  const url = `https://api.themoviedb.org/3/movie/${params.id}/credits`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const credits = await response.json();
  const cast: ActorInfo[] = credits.cast;
  const sortedCast = cast
    .slice(0, 10)
    .sort((a: ActorInfo, b: ActorInfo) => b.popularity - a.popularity);

  return (
    <main>
      <section className='flex w-full flex-col items-start justify-center'>
        <h2 className='border w-fit py-0.5 px-1 uppercase text-xs border-black font-semibold mb-6'>
          Cast
        </h2>
        <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {sortedCast.map((actor: ActorInfo) => (
            <div
              key={actor.id}
              className='flex items-center justify-start gap-x-2'
            >
              <div>
                <Image
                  width={40}
                  height={40}
                  className='rounded-sm'
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
              </div>
              <div>
                <p>
                  {actor.name} / {actor.known_for_department}
                </p>
                <p className='text-orange-600 font-semibold'>
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
