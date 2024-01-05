import { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react';
import cn from '@/app/utils/cn';
import { NowPlayingMovieResponse } from '@/app/utils/types';

interface TimeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  time: string;
  selectedDate: string;
  today: string;
  movie: NowPlayingMovieResponse;
  selectedMovie: {
    movie: NowPlayingMovieResponse;
    day: string;
    time: string;
  } | null;
  setSelectedMovie: Dispatch<
    SetStateAction<{
      movie: NowPlayingMovieResponse;
      day: string;
      time: string;
    } | null>
  >;
}

export default function TimeButton({
  time,
  selectedDate,
  today,
  movie,
  selectedMovie,
  setSelectedMovie,
  ...rest
}: TimeButtonProps) {
  const currentTime = new Date();
  const referenceTime = new Date();
  const [hours, minutes] = time.split(':');
  referenceTime.setHours(Number(hours), Number(minutes), 0);

  const handleClick = () => {
    setSelectedMovie({ movie: movie, day: selectedDate, time: time });
  };

  return (
    <button
      onClick={handleClick}
      disabled={selectedDate === today && currentTime > referenceTime}
      className={cn(
        `bg-[#232323] hover:text-gray-200 text-white rounded-sm font-semibold px-2 py-1`,
        {
          'opacity-15': selectedDate === today && currentTime > referenceTime,
        },
        {
          'opacity-60':
            selectedMovie?.movie.id === movie.id && selectedMovie.time === time,
        }
      )}
      {...rest}
    >
      {time}
    </button>
  );
}
