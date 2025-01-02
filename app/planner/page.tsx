'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AddCourseModal } from '@/components/planner/add-course-modal';
import { EditCourseModal } from '@/components/planner/edit-course-modal';
import { SemesterCredits } from '@/components/SemesterCredits';
import { TotalCredits } from '@/components/TotalCredits';
import { Course, Semester } from '@/types/course';
import { Badge } from '@/components/ui/badge';

const dummyData: Semester[] = [
  {
    id: '1',
    name: 'Fall 2023',
    courses: [
      { id: '101', code: 'CS101', name: 'Introduction to Programming', credits: 3, difficulty: 'Medium' },
      { id: '102', code: 'MATH201', name: 'Calculus I', credits: 4, difficulty: 'Hard' },
      { id: '103', code: 'ENG105', name: 'Academic Writing', credits: 3, difficulty: 'Easy' },
      { id: '104', code: 'PHYS101', name: 'Physics I', credits: 4, difficulty: 'Medium' },
    ],
  },
];

export default function DegreePlanner() {
  const [semesters, setSemesters] = useState<Semester[]>(dummyData);
  const [editingSemesterId, setEditingSemesterId] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const addSemester = () => {
    const newSemester: Semester = {
      id: (semesters.length + 1).toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [],
    };
    setSemesters([...semesters, newSemester]);
  };

  const handleAddCourse = (semesterId: string, course: Course) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? { ...semester, courses: [...semester.courses, course] }
          : semester
      )
    );
  };

  const handleDeleteCourse = (semesterId: string, courseId: string) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              courses: semester.courses.filter((course) => course.id !== courseId),
            }
          : semester
      )
    );
  };

  const handleEditSemesterName = (semesterId: string, newName: string) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId ? { ...semester, name: newName } : semester
      )
    );
    setEditingSemesterId(null);
  };

  return (
    <div className="container mx-auto py-8">
      {/* Total Credits Across All Semesters */}
      <TotalCredits semesters={semesters} />

      {/* Add Semester Button */}
      <div className="mb-6 flex justify-center">
        <Button
          onClick={addSemester}
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          <span className="text-lg">Add Semester</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {semesters.map((semester) => (
          <Card key={semester.id} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {editingSemesterId === semester.id ? (
                  <input
                    type="text"
                    value={semester.name}
                    onChange={(e) => handleEditSemesterName(semester.id, e.target.value)}
                    onBlur={() => setEditingSemesterId(null)}
                    autoFocus
                    className="text-lg font-semibold border rounded p-1"
                  />
                ) : (
                  <h2 className="text-lg font-semibold">{semester.name}</h2>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingSemesterId(semester.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary">{semester.courses.length} courses</Badge>
            </div>
            {/* Total Semester Credits */}
            <SemesterCredits courses={semester.courses} />
            <div className="space-y-3 mt-2">
              {semester.courses.map((course) => (
                <div key={course.id} className="flex justify-between items-center border p-2 rounded">
                  <div>
                    <h3 className="font-semibold">{course.code}</h3>
                    <p className="text-sm text-muted-foreground">{course.name}</p>
                    <p className="text-sm">Credits: {course.credits}</p>
                    <Badge
                      style={{
                        backgroundColor:
                          course.difficulty === 'Hard'
                            ? '#FF4D4D'
                            : course.difficulty === 'Medium'
                            ? '#FFD700'
                            : '#4CAF50',
                        color: course.difficulty === 'Medium' ? '#000' : '#FFF',
                      }}
                    >
                      {course.difficulty}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingCourse(course)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteCourse(semester.id, course.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <AddCourseModal onAddCourse={(course) => handleAddCourse(semester.id, course)} />
            </div>
          </Card>
        ))}
      </div>
      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={(updatedCourse) =>
            setSemesters(
              semesters.map((semester) =>
                semester.id === updatedCourse.id
                  ? {
                      ...semester,
                      courses: semester.courses.map((course) =>
                        course.id === updatedCourse.id ? updatedCourse : course
                      ),
                    }
                  : semester
              )
            )
          }
        />
      )}
    </div>
  );
}
