'use client';

interface WebsiteLinkProps {
  website: string;
}

const WebsiteLink: React.FC<WebsiteLinkProps> = ({ website }) => {
  return (
    <a
      href={`https://${website}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block text-primary dark:text-dark-primary hover:text-primary/80"
    >
      Visit Website
    </a>
  );
};

export default WebsiteLink;