'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddCourseForm } from './add-course-form';
import { Course } from '@/types/course';

interface AddCourseModalProps {
  onAddCourse: (course: Course) => void;
}

export function AddCourseModal({ onAddCourse }: AddCourseModalProps) {
  const [open, setOpen] = useState(false);

  const handleAddCourse = (course: Course) => {
    onAddCourse(course);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <AddCourseForm onSubmit={handleAddCourse} />
      </DialogContent>
    </Dialog>
  );
}