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
    <div className='flex items-center justify-center gap-6 flex-wrap mt-6'>
      {result.results.map((movie: NowPlayingMovieResponse) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
