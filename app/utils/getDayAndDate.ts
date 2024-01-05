export default function getDayAndDate(dayIndex: number) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + dayIndex);

  const day = daysOfWeek[nextDay.getDay()];
  const date = nextDay
    .toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
    .replace(/\//g, '/');

  return `${day} ${date}`;
}
