import { LampEffect } from './components/lampEffect';
import Movies from './components/movies';

export default function App() {
  return (
    <main>
      <LampEffect />
      <section className='px-3 py-6 mt-6 flex flex-col w-full'>
        <h2 className='font-semibold text-xl pl-1 md:pl-12 underline text-left'>
          Top Movies
        </h2>
        <h3 className='pl-1 text-sm mt-1 md:pl-12 text-left'>
          The top films from our cinemas, find tickets near you.
        </h3>
        <div className='flex items-start justify-start w-full'>
          <Movies />
        </div>
      </section>
    </main>
  );
}
