"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs'; // Import Clerk's useAuth hook
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
  const { userId } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Fetch saved plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      if (!userId) {
        toast.error('User not authenticated.');
        return;
      }

      try {
        const response = await fetch(`/api/plans?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          const fetchedPlans = data?.plans;
          if (Array.isArray(fetchedPlans)) {
            setPlans(fetchedPlans);
            if (fetchedPlans.length > 0) {
              setSelectedPlanId(fetchedPlans[0]._id);
              setSelectedPlan(fetchedPlans[0]);
            }
          } else {
            throw new Error('Invalid response format');
          }
        } else {
          toast.error('Failed to fetch plans.');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('Error fetching plans.');
      }
    };

    fetchPlans();
  }, [userId]);

  // Add a new plan
  const addPlan = async () => {
    if (!userId) {
      toast.error('User not authenticated.');
      return;
    }

    const newPlan: Plan = {
      userId,
      planName: 'New Degree Plan',
      universityName: '',
      requiredCredits: 120,
      totalCredits: 0,
      semesters: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _id: '',
    };

    try {
      const response = await fetch(`/api/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlan),
      });

      if (response.ok) {
        const savedPlan = await response.json();
        setPlans((prev) => [...prev, savedPlan.plan]);
        setSelectedPlanId(savedPlan.plan._id);
        setSelectedPlan(savedPlan.plan);
        toast.success('New plan created successfully!');
      } else {
        toast.error('Failed to add a new plan.');
      }
    } catch (error) {
      console.error('Error adding plan:', error);
      toast.error('Error adding new plan.');
    }
  };

  // Save the selected plan to the backend
  const savePlan = async () => {
    if (!selectedPlan) return;

    try {
      const response = await fetch(`/api/plans/${selectedPlan._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPlan),
      });

      if (response.ok) {
        toast.success('Plan saved successfully!');
        const updatedPlans = plans.map((plan) =>
          plan._id === selectedPlan._id ? selectedPlan : plan
        );
        setPlans(updatedPlans);
      } else {
        toast.error('Failed to save plan.');
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error('Error saving plan.');
    }
  };

  // Add a new semester
  const addSemester = () => {
    if (!selectedPlan) {
      toast.error('No plan selected. Please select or create a plan first.');
      return;
    }

    const currentSemesters = selectedPlan.semesters || [];

    const newSemester: Semester = {
      id: (currentSemesters.length + 1).toString(),
      name: `Semester ${currentSemesters.length + 1}`,
      courses: [],
      totalCredits: 0,
    };

    const updatedPlan = {
      ...selectedPlan,
      semesters: [...currentSemesters, newSemester],
      updatedAt: new Date().toISOString(),
    };

    setSelectedPlan(updatedPlan);
    setPlans((prev) =>
      prev.map((plan) => (plan._id === updatedPlan._id ? updatedPlan : plan))
    );
    toast.success('Semester added successfully!');
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />

      {!userId ? (
        <div className="text-center">Please log in to view your plans.</div>
      ) : (
        <>
          <div className="mb-6 flex justify-center gap-4">
            <select
              value={selectedPlanId || ''}
              onChange={(e) => {
                const selectedId = e.target.value;
                if (selectedId === 'add-plan') {
                  addPlan();
                } else {
                  setSelectedPlanId(selectedId);
                  const foundPlan = plans.find((plan) => plan._id === selectedId);
                  setSelectedPlan(foundPlan || null);
                }
              }}
              className="p-2 border rounded"
            >
              <option value="" disabled key="default-option">
                Select a Plan
              </option>
              {plans.map((plan, index) => (
                <option key={plan._id || index} value={plan._id}>
                  {plan.planName}
                </option>
              ))}
              <option value="add-plan" key="add-plan">
                Add Plan
              </option>
            </select>
          </div>

          {selectedPlan ? (
            <>
              <TotalCredits
                semesters={selectedPlan.semesters}
                requiredCredits={selectedPlan.requiredCredits}
                setRequiredCredits={(credits) => {
                  const updatedPlan = { ...selectedPlan, requiredCredits: credits };
                  setSelectedPlan(updatedPlan);
                  setPlans((prev) =>
                    prev.map((plan) =>
                      plan._id === updatedPlan._id ? updatedPlan : plan
                    )
                  );
                }}
              />

              <div className="mb-6 flex justify-center gap-4">
                <Button
                  onClick={addSemester}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add Semester
                </Button>
                <SavePlan onPlanSave={savePlan} plan={selectedPlan} />
              </div>

              <div className="space-y-6">
                {selectedPlan?.semesters?.length ? (
                  selectedPlan.semesters.map((semester) => (
                    <SemesterCard
                      key={semester.id}
                      semesterId={semester.id}
                      semesterName={semester.name}
                      courses={semester.courses}
                      onAddCourse={(course) => {
                        const updatedSemesters = selectedPlan.semesters.map((sem) =>
                          sem.id === semester.id
                            ? { ...sem, courses: [...sem.courses, course] }
                            : sem
                        );
                        const updatedPlan = { ...selectedPlan, semesters: updatedSemesters };
                        setSelectedPlan(updatedPlan);
                        setPlans((prev) =>
                          prev.map((plan) =>
                            plan._id === updatedPlan._id ? updatedPlan : plan
                          )
                        );
                        toast.success(`Course "${course.name}" added successfully!`);
                      }}
                      onEditCourse={(updatedCourse) => {
                        const updatedSemesters = selectedPlan.semesters.map((sem) =>
                          sem.id === semester.id
                            ? {
                                ...sem,
                                courses: sem.courses.map((course) =>
                                  course.code === updatedCourse.code
                                    ? updatedCourse
                                    : course
                                ),
                              }
                            : sem
                        );
                        const updatedPlan = { ...selectedPlan, semesters: updatedSemesters };
                        setSelectedPlan(updatedPlan);
                        setPlans((prev) =>
                          prev.map((plan) =>
                            plan._id === updatedPlan._id ? updatedPlan : plan
                          )
                        );
                        toast.info(`Course "${updatedCourse.name}" updated successfully!`);
                      }}
                      onDeleteCourse={(courseId) => {
                        const updatedSemesters = selectedPlan.semesters.map((sem) =>
                          sem.id === semester.id
                            ? {
                                ...sem,
                                courses: sem.courses.filter((course) => course.code !== courseId),
                              }
                            : sem
                        );
                        const updatedPlan = { ...selectedPlan, semesters: updatedSemesters };
                        setSelectedPlan(updatedPlan);
                        setPlans((prev) =>
                          prev.map((plan) =>
                            plan._id === updatedPlan._id ? updatedPlan : plan
                          )
                        );
                        toast.error('Course deleted successfully!');
                      }}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No semesters available. Add one to get started.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              No plan selected. Add or select a plan to continue.
            </div>
          )}

          {isSaveModalOpen && selectedPlan && (
            <SavePlanModal
              plan={selectedPlan}
              onClose={() => setIsSaveModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
