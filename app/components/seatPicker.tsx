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
    <div className='flex mb-8 md:mb-0 items-center justify-center flex-col w-full md:w-fit gap-y-4'>
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
    <ul className='w-full bg-[#232323] py-1 px-3 rounded-sm text-white mb-4 flex items-center justify-center space-x-5'>
      <li className='flex items-center justify-center space-x-1'>
        <span className='w-3 h-3 flex rounded-full bg-gray-600' />{' '}
        <span>N/A</span>
      </li>{' '}
      <li className='flex items-center justify-center space-x-1'>
        <span className='w-3 h-3 flex rounded-full bg-green-500' />{' '}
        <span>Selected</span>
      </li>{' '}
      <li className='flex items-center justify-center space-x-1'>
        <span className='w-3 h-3 flex rounded-full bg-red-600' />{' '}
        <span>Occupied</span>
      </li>
    </ul>
  );
}

function Cinema({ selectedSeats, onSelectedSeatsChange }: CinemaProps) {
  const seats = Array.from({ length: 80 }, (_, i) => ({
    seat: i + 1,
    isSelected: selectedSeats.includes(i + 1),
  }));

  function handleSelectedState(seat: number) {
    const updatedSeats = seats.map((s) =>
      s.seat === seat ? { ...s, isSelected: !s.isSelected } : s
    );

    const newSelectedSeats = updatedSeats
      .filter((s) => s.isSelected)
      .map((s) => s.seat);

    onSelectedSeatsChange(newSelectedSeats);
  }

  return (
    <div className=''>
      <div className='h-16 w-5/6 mx-auto bg-white mb-6 p-3 text-center text-xs font-semibold rounded-sm transform -rotate-x-30 scale-110 shadow-2xl'>
        Screen
      </div>
      <div className='grid grid-cols-8 gap-2'>
        {seats.map((seat, index) => (
          <div
            tabIndex={0}
            key={seat.seat}
            className={cn(
              'flex items-center mr-1 cursor-pointer justify-center w-8 h-6 rounded-t-xl bg-black text-xs text-white',
              seat.isSelected && 'bg-green-500 hover:bg-green-300'
            )}
            onClick={() => handleSelectedState(seat.seat)}
          >
            {seat.seat}
          </div>
        ))}
      </div>
    </div>
  );
}
