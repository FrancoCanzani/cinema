import { ButtonHTMLAttributes } from 'react';
import getDayAndDate from '@/app/utils/getDayAndDate';
import cn from '@/app/utils/cn';

interface TimeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  time: string;
  selectedDate: string;
  today: string;
}

export default function TimeButton({
  time,
  selectedDate,
  today,
  ...rest
}: TimeButtonProps) {
  const currentTime = new Date();
  const referenceTime = new Date();
  const [hours, minutes] = time.split(':');
  referenceTime.setHours(Number(hours), Number(minutes), 0);

  return (
    <button
      onClick={() => console.log('Not disabled')}
      disabled={selectedDate === today && currentTime > referenceTime}
      className={cn(
        `bg-[#232323] hover:text-gray-200 text-white rounded-sm font-semibold px-2 py-1`,
        {
          'opacity-15': selectedDate === today && currentTime > referenceTime,
        }
      )}
      {...rest}
    >
      {time}
    </button>
  );
}
