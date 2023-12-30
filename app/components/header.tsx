import Link from 'next/link';

export default function Header() {
  return (
    <header className='w-full flex items-center justify-between p-4 bg-[#232323] text-white shadow-sm'>
      <Link href={'/'} className='uppercase italic font-bold text-sm'>
        Lumière
      </Link>
      <Link href={'#'} className='font-bold text-sm'>
        Sign In
      </Link>
    </header>
  );
}
