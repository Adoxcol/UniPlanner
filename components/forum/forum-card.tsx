'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

interface ForumCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  replies: number;
  likes: number;
  tags: string[];
  slug: string;
}

export function ForumCard({ title, excerpt, author, date, replies, likes, tags, slug }: ForumCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <Link href={`/forum/${slug}`}>
        <div className="p-6">
          <div className="flex gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-muted-foreground mb-4">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{likes}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {author} · {date}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}