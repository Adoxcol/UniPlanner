'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Course } from '@/types/course';

interface CourseCardProps extends Course {
  onDelete: () => void;
}

export function CourseCard({ code, name, credits, difficulty, onDelete }: CourseCardProps) {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  }[difficulty];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{code}</h3>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Badge variant="outline">{credits} credits</Badge>
        <Badge className={difficultyColor}>{difficulty}</Badge>
      </div>
    </Card>
  );
}