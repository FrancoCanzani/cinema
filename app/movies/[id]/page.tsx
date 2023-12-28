import { NowPlayingMovieResponse } from '@/app/utils/types';

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

export default function Movie({ params }: { params: { id: string } }) {
  return <div>Movie: {params.id}</div>;
}
