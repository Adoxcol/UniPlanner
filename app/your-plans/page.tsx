'use client';

import { useState } from 'react';
import { PlanCard } from '@/components/plans/plan-card';
import { EditCourseModal } from '@/components/plans/edit-course-modal';
import { AddEnrolledCourseModal } from '@/components/plans/add-enrolled-course-modal';
import { EnrolledCourse } from '@/types/course';

const DEMO_ENROLLED_COURSES = [
  {
    code: 'CS101',
    name: 'Introduction to Computer Science',
    credits: 3,
    difficulty: 'Medium' as const,
    section: 'A',
    classroom: 'Room 101',
    time: 'Mon/Wed 10:00-11:20',
    grade: 'Z',
  },
  {
    code: 'CS101L',
    name: 'Introduction to Computer Science Lab',
    credits: 1,
    difficulty: 'Medium' as const,
    section: 'L1',
    classroom: 'Lab 203',
    time: 'Tue 14:00-15:50',
    grade: 'Z',
  },
];

export default function YourPlansPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(DEMO_ENROLLED_COURSES);
  const [editingCourse, setEditingCourse] = useState<EnrolledCourse | null>(null);

  const handleAddCourse = (course: EnrolledCourse) => {
    setEnrolledCourses(prev => [...prev, course]);
  };

  const handleEditCourse = (course: EnrolledCourse) => {
    setEnrolledCourses(courses => 
      courses.map(c => c.code === editingCourse?.code ? course : c)
    );
    setEditingCourse(null);
  };

  const handleDeleteCourse = (code: string) => {
    setEnrolledCourses(courses => courses.filter(c => c.code !== code));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Plans</h1>
          <p className="text-muted-foreground mt-2">
            Manage your enrolled courses and track your grades
          </p>
        </div>
        <AddEnrolledCourseModal onAddCourse={handleAddCourse} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {enrolledCourses.map((course) => (
          <PlanCard
            key={course.code}
            course={course}
            onEdit={() => setEditingCourse(course)}
            onDelete={() => handleDeleteCourse(course.code)}
          />
        ))}
      </div>

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onSave={handleEditCourse}
          onClose={() => setEditingCourse(null)}
        />
      )}
    </div>
  );
}