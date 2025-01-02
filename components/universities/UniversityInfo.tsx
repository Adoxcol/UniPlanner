'use client';

interface UniversityInfoProps {
  name: string;
  shortName: string;
  location: string;
}

const UniversityInfo: React.FC<UniversityInfoProps> = ({ name, shortName, location }) => {
  return (
    <div className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-foreground dark:text-dark-foreground">{name}</h2>
      <p className="mt-2 text-sm text-muted-foreground dark:text-dark-muted-foreground">{shortName}</p>
      <p className="mt-2 text-sm text-muted-foreground dark:text-dark-muted-foreground">{location}</p>
    </div>
  );
};

export default UniversityInfo;