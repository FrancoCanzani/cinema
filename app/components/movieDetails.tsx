import convertRuntime from '../utils/convertRuntime';
import formatCurrency from '../utils/formatCurrency';

export default async function MovieDetails({ movieId }: { movieId: number }) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const movie = await response.json();

  interface GenreProps {
    id: string;
    name: string;
  }

  return (
    <div>
      <ul className='w-full flex justify-start'>
        {movie.genres.map((genre: GenreProps, index: number) => (
          <li key={genre.id} className='mr-1 text-sm font-semibold'>
            {genre.name}
            {index !== movie.genres.length - 1 && ', '}
          </li>
        ))}
      </ul>
      <p className='text-sm italic'>
        {movie.release_date} / {convertRuntime(movie.runtime)}
        {movie.budget > 0 && ` / ${formatCurrency(movie.budget)}`}
      </p>
    </div>
  );
}
