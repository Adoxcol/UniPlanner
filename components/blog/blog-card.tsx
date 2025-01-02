'use client';

import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  slug: string;
}

export function BlogCard({ title, excerpt, author, date, readTime, slug }: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${slug}`}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-muted-foreground mb-4">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <img src={author.avatar} alt={author.name} />
              </Avatar>
              <div>
                <p className="text-sm font-medium">{author.name}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{readTime}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}