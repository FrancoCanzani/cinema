import { NowPlayingMovieResponse } from '../utils/types';
import Movie from './movie';

export default async function Movies() {
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
    <div className='max-w-7xl mx-auto px-4 my-8 sm:px-6 lg:px-8'>
      <h2 className='text-3xl font-extrabold tracking-tight text-gray-900'>
        Top Films
      </h2>
      <p className='mt-2 text-sm'>
        The top films from our cinemas, find tickets near you.
      </p>
      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
        {result.results.map((movie: NowPlayingMovieResponse) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
