'use client';

import { BlogCard } from '@/components/blog/blog-card';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

const DEMO_POSTS = [
  {
    title: 'How I Balanced Work and Study in Computer Science',
    excerpt: 'Learn the strategies I used to maintain a 3.8 GPA while working part-time as a developer...',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    slug: 'balancing-work-and-study',
  },
  {
    title: 'Essential Study Tips for First-Year Engineering Students',
    excerpt: 'A comprehensive guide to surviving and thriving in your first year of engineering...',
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    date: 'Mar 12, 2024',
    readTime: '8 min read',
    slug: 'first-year-engineering-tips',
  },
  {
    title: 'My Journey Through a Psychology Degree',
    excerpt: 'Reflecting on three years of studying psychology and what I wish I knew when I started...',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    slug: 'psychology-degree-journey',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Share your university experiences and learn from others
          </p>
        </div>
        <Button>
          <PenSquare className="mr-2 h-4 w-4" />
          Write a Post
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_POSTS.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}