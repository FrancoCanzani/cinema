import React, { useState } from 'react';
import { NowPlayingMovieResponse } from '../utils/types';
import cn from '../utils/cn';

interface CinemaProps {
  selectedSeats: number[];
  onSelectedSeatsChange: (selectedSeats: number[]) => void;
  movie: NowPlayingMovieResponse | null;
}

export default function SeatPicker() {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const storedItem = sessionStorage.getItem('selectedMovie');
  const storedObj = storedItem ? JSON.parse(storedItem) : null;
  const selectedMovie: NowPlayingMovieResponse | null = storedObj?.movie;

  return (
    <div className='flex items-center justify-center flex-col w-full md:w-fit gap-y-4'>
      <ShowCase />
      <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={(selectedSeats) =>
          setSelectedSeats(selectedSeats)
        }
      />
    </div>
  );
}

function ShowCase() {
  return (
    <ul className='w-full bg-[#232323] rounded-sm text-white mb-4 flex items-center justify-center space-x-5'>
      <li>
        <span className='' /> <small>N/A</small>
      </li>
      <li>
        <span className='' /> <small>Selected</small>
      </li>
      <li>
        <span className='' /> <small>Occupied</small>
      </li>
    </ul>
  );
}

function Cinema({ selectedSeats, onSelectedSeatsChange }: CinemaProps) {
  const rows = 8;
  const columns = 8;

  const seats = Array.from({ length: rows * columns }, (_, i) => i + 1);

  function handleSelectedState(seat: number) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className=''>
      <div className='h-12 w-4/5 mx-auto bg-white mb-6 p-3 text-center text-xs font-semibold rounded-sm transform -rotate-x-30 scale-110 shadow-lg'>
        Screen
      </div>
      <div className='grid grid-cols-8 gap-2'>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          return (
            <span
              tabIndex={0}
              key={seat}
              className={cn(
                'flex items-center cursor-pointer justify-center bg-gray-600 hover:bg-gray-400 w-8 text-xs text-white h-6 rounded-tl-2xl rounded-tr-2xl transition-transform ease-in-out',
                isSelected && 'bg-green-500 hover:bg-green-300'
              )}
              onClick={() => handleSelectedState(seat)}
            >
              {seat}
            </span>
          );
        })}
      </div>
    </div>
  );
}
