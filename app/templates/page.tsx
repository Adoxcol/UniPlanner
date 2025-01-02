'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star } from 'lucide-react';

const DEMO_TEMPLATES = [
  {
    title: 'Computer Science Major',
    description: 'A comprehensive 4-year plan for Computer Science students',
    credits: 120,
    courses: 40,
    rating: 4.8,
    downloads: 1234,
  },
  {
    title: 'Pre-Med Track',
    description: 'Complete course plan for pre-medical students',
    credits: 128,
    courses: 42,
    rating: 4.9,
    downloads: 2156,
  },
  {
    title: 'Business Administration',
    description: 'Strategic course selection for Business majors',
    credits: 124,
    courses: 41,
    rating: 4.7,
    downloads: 1876,
  },
];

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Degree Templates</h1>
        <p className="text-muted-foreground mt-2">
          Browse and download pre-made degree plans from successful graduates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_TEMPLATES.map((template) => (
          <Card key={template.title} className="p-6">
            <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
            <p className="text-muted-foreground mb-4">{template.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-lg font-semibold">{template.credits}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses</p>
                <p className="text-lg font-semibold">{template.courses}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="font-semibold">{template.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{template.downloads}</span>
              </div>
            </div>

            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}