'use client';

import { ForumCard } from '@/components/forum/forum-card';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';

const DEMO_THREADS = [
  {
    title: 'Tips for CS50 Final Project?',
    excerpt: 'Working on my final project for CS50 and looking for advice on scope and implementation...',
    author: 'Alex Kim',
    date: '2h ago',
    replies: 12,
    likes: 8,
    tags: ['CS50', 'Programming', 'Help'],
    slug: 'cs50-final-project-tips',
  },
  {
    title: 'Best Resources for Learning Calculus II',
    excerpt: 'Struggling with integration techniques. What resources helped you master this topic?',
    author: 'Maria Garcia',
    date: '5h ago',
    replies: 15,
    likes: 23,
    tags: ['Mathematics', 'Calculus', 'Study Resources'],
    slug: 'calculus-2-resources',
  },
  {
    title: 'Student Organizations Worth Joining?',
    excerpt: 'Looking for recommendations on which student organizations provide the best experience...',
    author: 'Jordan Lee',
    date: '1d ago',
    replies: 28,
    likes: 45,
    tags: ['Campus Life', 'Advice', 'Organizations'],
    slug: 'student-organizations',
  },
];

export default function ForumPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Forum</h1>
          <p className="text-muted-foreground mt-2">
            Connect with fellow students and share your knowledge
          </p>
        </div>
        <Button>
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Thread
        </Button>
      </div>
      
      <div className="space-y-4">
        {DEMO_THREADS.map((thread) => (
          <ForumCard key={thread.slug} {...thread} />
        ))}
      </div>
    </div>
  );
}