'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Clock, MapPin } from 'lucide-react';
import { EnrolledCourse } from '@/types/course';

interface PlanCardProps {
  course: EnrolledCourse;
  onEdit: () => void;
  onDelete: () => void;
}

export function PlanCard({ course, onEdit, onDelete }: PlanCardProps) {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  }[course.difficulty];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{course.code}</h3>
          <p className="text-sm text-muted-foreground">{course.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{course.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{course.classroom}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Badge variant="outline">{course.credits} credits</Badge>
        <Badge className={difficultyColor}>{course.difficulty}</Badge>
        <Badge variant="secondary">Section {course.section}</Badge>
        <Badge variant="outline">Grade: {course.grade}</Badge>
      </div>
    </Card>
  );
}