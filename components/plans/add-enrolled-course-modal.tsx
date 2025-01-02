'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddEnrolledCourseForm } from './add-enrolled-course-form';
import { EnrolledCourse } from '@/types/course';

interface AddEnrolledCourseModalProps {
  onAddCourse: (course: EnrolledCourse) => void;
}

export function AddEnrolledCourseModal({ onAddCourse }: AddEnrolledCourseModalProps) {
  return (
    <Dialog>
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
        <AddEnrolledCourseForm onSubmit={onAddCourse} />
      </DialogContent>
    </Dialog>
  );
}