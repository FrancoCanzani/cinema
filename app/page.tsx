import MoviePicker from './components/MoviePicker';

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
      <MoviePicker movies={result.results} />
    </main>
  );
}
