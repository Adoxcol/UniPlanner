'use client';

import { useState, useEffect } from 'react';
import { TotalCredits } from '@/components/plans/TotalCredits';
import { Button } from '@/components/ui/button';
import SavePlan from '@/components/plans/SavePlan';
import SavePlanModal from '@/components/plans/SavePlanModal';
import { SemesterCard } from '@/components/plans/SemesterCard';
import { Semester } from '@/types/mongodb';
import { Plan } from '@/types/mongodb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DegreePlanner() {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [requiredCredits, setRequiredCredits] = useState<number | null>(120);
  const [plan, setPlan] = useState<Plan>({
    userId: '1', // Replace with actual user ID
    planName: 'My Degree Plan',
    universityName: '',
    requiredCredits: requiredCredits ?? 120,
    totalCredits: 0,
    semesters: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Update `requiredCredits` in plan
  useEffect(() => {
    setPlan((prev) => ({
      ...prev,
      requiredCredits: requiredCredits ?? 120,
    }));
  }, [requiredCredits]);

  // Recalculate total credits when semesters change
  useEffect(() => {
    const updatedTotalCredits = semesters.reduce(
      (sum, semester) =>
        sum + semester.courses.reduce((courseSum, course) => courseSum + course.credits, 0),
      0
    );
    setPlan((prev) => ({
      ...prev,
      totalCredits: updatedTotalCredits,
      updatedAt: new Date().toISOString(),
    }));
  }, [semesters]);

  // Add a new semester
  const addSemester = () => {
    const newSemester: Semester = {
      id: (semesters.length + 1).toString(),
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      totalCredits: 0,
    };
    const updatedSemesters = [...semesters, newSemester];
    setSemesters(updatedSemesters);
    setPlan((prev) => ({
      ...prev,
      semesters: updatedSemesters,
      updatedAt: new Date().toISOString(),
    }));
    toast.success('Semester added successfully!');
  };

  // Save the plan to the backend
  const savePlan = async () => {
    try {
      const response = await fetch(`/api/plans/${plan.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      });

      if (response.ok) {
        toast.success('Plan saved successfully!');
      } else {
        toast.error('Failed to save plan.');
      }
    } catch (error) {
      toast.error('Error saving plan.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <TotalCredits
        semesters={semesters}
        requiredCredits={requiredCredits}
        setRequiredCredits={setRequiredCredits}
      />

      <div className="mb-6 flex justify-center gap-4">
        <Button
          onClick={addSemester}
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          Add Semester
        </Button>
        <SavePlan onPlanSave={savePlan} plan={plan} />
      </div>

      <div className="space-y-6">
        {semesters.map((semester) => (
          <SemesterCard
            key={semester.id}
            semesterId={semester.id}
            semesterName={semester.name}
            courses={semester.courses}
            onAddCourse={(course) => {
              const updatedSemesters = semesters.map((sem) =>
                sem.id === semester.id
                  ? { ...sem, courses: [...sem.courses, course] }
                  : sem
              );
              setSemesters(updatedSemesters);
              setPlan((prev) => ({
                ...prev,
                semesters: updatedSemesters,
                updatedAt: new Date().toISOString(),
              }));
              toast.success(`Course "${course.name}" added successfully!`);
            }}
            onEditCourse={(updatedCourse) => {
              const updatedSemesters = semesters.map((sem) =>
                sem.id === semester.id
                  ? {
                      ...sem,
                      courses: sem.courses.map((course) =>
                        course.code === updatedCourse.code ? updatedCourse : course
                      ),
                    }
                  : sem
              );
              setSemesters(updatedSemesters);
              setPlan((prev) => ({
                ...prev,
                semesters: updatedSemesters,
                updatedAt: new Date().toISOString(),
              }));
              toast.info(`Course "${updatedCourse.name}" updated successfully!`);
            }}
            onDeleteCourse={(courseId) => {
              const updatedSemesters = semesters.map((sem) =>
                sem.id === semester.id
                  ? {
                      ...sem,
                      courses: sem.courses.filter((course) => course.code !== courseId),
                    }
                  : sem
              );
              setSemesters(updatedSemesters);
              setPlan((prev) => ({
                ...prev,
                semesters: updatedSemesters,
                updatedAt: new Date().toISOString(),
              }));
              toast.error('Course deleted successfully!');
            }}
          />
        ))}
      </div>

      {isSaveModalOpen && (
        <SavePlanModal
          plan={plan}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
}
