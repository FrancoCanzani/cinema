export default function Footer() {
  const year = new Date();
  const siteLinks = [
    'Terms and Conditions',
    'Sitemap',
    'Privacy Policy',
    'Cookie Policy',
    'FAQ Pages',
  ];
  return (
    <footer className='bg-slate-950 text-white p-3 text-center'>
      <h2 className='uppercase italic font-bold text-sm mb-2'>
        Lumière Cinemas {year.getFullYear()}
      </h2>
      <hr />
      <div className='flex items-center justify-center text-sm space-x-4 mt-2'>
        {siteLinks.map((word) => (
          <p key={word}>{word}</p>
        ))}
      </div>
    </footer>
  );
}
