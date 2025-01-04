'use client';

import { useState, useEffect } from 'react';
import { SemesterCard } from '@/components/plans/SemesterCard';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';

export interface Semester {
  semesterName: string;
  courses: Course[];
}

export interface Plan {
  _id: string; // Unique identifier for the plan
  userId: string;
  planName: string;
  universityName?: string;
  requiredCredits: number; // Total credits required for the plan
  totalCredits: number; // Total credits across all semesters
  semesters: Semester[];
  createdAt: string;
  updatedAt: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all plans for the user (e.g., user ID 1)
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans?userId=1');
        const data = await response.json();

        if (data.success) {
          setPlans(data.plans);
          if (data.plans.length > 0) {
            setSelectedPlanId(data.plans[0]._id); // Select the first plan by default
            setSelectedPlan(data.plans[0]);
          }
        } else {
          setError(data.message || 'Failed to fetch plans');
        }
      } catch (error) {
        setError('Error fetching plans');
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    // Update the selected plan whenever selectedPlanId changes
    if (selectedPlanId !== null) {
      const plan = plans.find((p) => p._id === selectedPlanId);
      setSelectedPlan(plan || null);
    }
  }, [selectedPlanId, plans]);

  const addSemester = () => {
    if (!selectedPlan) return;

    const newSemester: Semester = {
      semesterName: `Semester ${selectedPlan.semesters.length + 1}`,
      courses: [],
    };

    const updatedPlan: Plan = {
      ...selectedPlan,
      semesters: [...selectedPlan.semesters, newSemester],
      updatedAt: new Date().toISOString(), // Update the updatedAt field
    };

    // Update the selected plan and the plans list
    setSelectedPlan(updatedPlan);
    setPlans((prev) =>
      prev.map((p) => (p._id === selectedPlan._id ? updatedPlan : p))
    );
  };

  const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = event.target.value;
    setSelectedPlanId(planId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!selectedPlan) {
    return <div className="text-center">No plans available. Create a new plan to get started.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Semester Planner</h1>

      {/* Plan Selection Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedPlanId || ''}
          onChange={handlePlanChange}
          className="p-2 border rounded"
        >
          {plans.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.planName} {plan.universityName && `(${plan.universityName})`}
            </option>
          ))}
        </select>
      </div>

      {/* Display Plan Details */}
      <div className="text-center mb-8">
        <p className="text-lg">
          Required Credits: <span className="font-bold">{selectedPlan.requiredCredits}</span>
        </p>
        <p className="text-lg">
          Total Credits: <span className="font-bold">{selectedPlan.totalCredits}</span>
        </p>
      </div>

      {/* Add Semester Button */}
      <div className="flex justify-center mb-8">
        <Button onClick={addSemester}>Add Semester</Button>
      </div>

      {/* Display Semesters */}
      <div className="space-y-6">
        {selectedPlan.semesters.map((semester, index) => (
          <SemesterCard
            key={index}
            semesterName={semester.semesterName}
            courses={semester.courses}
          />
        ))}
      </div>
    </div>
  );
}