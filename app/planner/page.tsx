'use client';

import { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AddCourseModal } from '@/components/planner/add-course-modal';
import { EditCourseModal } from '@/components/planner/edit-course-modal';
import { SemesterCredits } from '@/components/SemesterCredits';
import { TotalCredits } from '@/components/TotalCredits';
import SavePlanModal from '@/components/SavePlanModal';
import { Course } from '@/types/course';
import { Semester } from '@/types/semester';
import { Plan } from '@/types/plan';
import { Badge } from '@/components/ui/badge';

export default function DegreePlanner() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [requiredCredits, setRequiredCredits] = useState<number | null>(120);
  const [editingSemesterId, setEditingSemesterId] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const [plan, setPlan] = useState<Plan>({
    userId: 'USER_ID', // Replace with actual user ID
    planName: 'My Degree Plan',
    universityName: '', // Initialize empty
    requiredCredits: requiredCredits ?? 120,
    semesters: semesters,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Recalculate total credits whenever semesters change
  useEffect(() => {
    const updatedTotalCredits = semesters.reduce(
      (sum, semester) =>
        sum + semester.courses.reduce((courseSum, course) => courseSum + course.credits, 0),
      0
    );
    setPlan((prev) => ({ ...prev, totalCredits: updatedTotalCredits, updatedAt: new Date().toISOString() }));
  }, [semesters]);

  const addSemester = () => {
    const newSemester: Semester = {
      id: (semesters.length + 1).toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      totalCredits: 0,
    };
    const updatedSemesters = [...semesters, newSemester];
    setSemesters(updatedSemesters);
    setPlan({ ...plan, semesters: updatedSemesters, updatedAt: new Date().toISOString() });
  };

  const handleAddCourse = (semesterId: string, course: Course) => {
    const updatedSemesters = semesters.map((semester) =>
      semester.id === semesterId
        ? {
            ...semester,
            courses: [...semester.courses, course],
            totalCredits: semester.totalCredits + course.credits,
          }
        : semester
    );
    setSemesters(updatedSemesters);
    setPlan({ ...plan, semesters: updatedSemesters, updatedAt: new Date().toISOString() });
  };

  const handleDeleteCourse = (semesterId: string, courseId: string) => {
    const updatedSemesters = semesters.map((semester) =>
      semester.id === semesterId
        ? {
            ...semester,
            courses: semester.courses.filter((course) => course.id !== courseId),
            totalCredits: semester.courses
              .filter((course) => course.id !== courseId)
              .reduce((sum, course) => sum + course.credits, 0),
          }
        : semester
    );
    setSemesters(updatedSemesters);
    setPlan({ ...plan, semesters: updatedSemesters, updatedAt: new Date().toISOString() });
  };

  const handleEditSemesterName = (semesterId: string, newName: string) => {
    const updatedSemesters = semesters.map((semester) =>
      semester.id === semesterId ? { ...semester, name: newName } : semester
    );
    setSemesters(updatedSemesters);
    setPlan({ ...plan, semesters: updatedSemesters, updatedAt: new Date().toISOString() });
    setEditingSemesterId(null);
  };

  const updateRequiredCredits = (credits: number) => {
    setRequiredCredits(credits);
    setPlan((prev) => ({ ...prev, requiredCredits: credits, updatedAt: new Date().toISOString() }));
  };

  return (
    <div className="container mx-auto py-8">
      <TotalCredits
        semesters={semesters}
        requiredCredits={requiredCredits}
        setRequiredCredits={updateRequiredCredits}
      />

      <div className="mb-6 flex justify-center gap-4">
        <Button
          onClick={addSemester}
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          <span className="text-lg">Add Semester</span>
        </Button>
        <Button
          onClick={() => setIsSaveModalOpen(true)}
          className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
        >
          <span className="text-lg">Save Plan</span>
        </Button>
      </div>

      {isSaveModalOpen && (
        <SavePlanModal
          plan={plan}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}

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
          onSave={(updatedCourse) => {
            const updatedSemesters = semesters.map((semester) =>
              semester.id === updatedCourse.id
                ? {
                    ...semester,
                    courses: semester.courses.map((course) =>
                      course.id === updatedCourse.id ? updatedCourse : course
                    ),
                  }
                : semester
            );
            setSemesters(updatedSemesters);
            setPlan({ ...plan, semesters: updatedSemesters, updatedAt: new Date().toISOString() });
          }}
        />
      )}
    </div>
  );
}
