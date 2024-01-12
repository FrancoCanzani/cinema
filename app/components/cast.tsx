import Image from 'next/image';
import { ActorInfo } from '../utils/types';

export default async function Cast({ movieId }: { movieId: string }) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
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
    .slice(0, 12)
    .sort((a: ActorInfo, b: ActorInfo) => b.popularity - a.popularity);

  return (
    <section className='flex w-full mt-6 md:mt-0 flex-col items-start justify-center'>
      <h2 className='border w-fit py-0.5 px-1 uppercase text-xs border-black font-semibold mb-6'>
        Cast
      </h2>
      <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sortedCast.map((actor: ActorInfo) => (
          <CastMember actor={actor} key={actor.id} />
        ))}
      </div>
    </section>
  );
}

function CastMember({ actor }: { actor: ActorInfo }) {
  return (
    <div className='flex items-center justify-start gap-x-2'>
      <div>
        {actor.profile_path ? (
          <Image
            width={40}
            height={40}
            className='rounded-sm'
            src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
            alt={actor.name}
          />
        ) : (
          <Image
            src='/cast_placeholder.jpg'
            alt={actor.name}
            className='rounded-sm'
            width={40}
            height={80}
          />
        )}
      </div>
      <div>
        <p>
          {actor.name} / {actor.known_for_department}
        </p>
        <p className='text-orange-600 font-semibold'>{actor.character}</p>
      </div>
    </div>
  );
}
