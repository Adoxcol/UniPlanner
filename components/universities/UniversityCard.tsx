'use client';

import Link from 'next/link';

export default function UniversityCard({
  name,
  shortName,
}: {
  name: string;
  shortName: string;
}) {
  return (
    <div className="bg-card dark:bg-dark-card shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link
        href={`/university/${shortName.toLowerCase().replace(/\s+/g, '-')}`} // Navigate by short name
        className="text-primary dark:text-dark-primary hover:text-primary/80 text-xl font-medium"
      >
        {name}
      </Link>
    </div>
  );
}