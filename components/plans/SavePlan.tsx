'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plan } from '@/types/mongodb';
import SavePlanModal from './SavePlanModal'; // Import SavePlanModal
import { useAuth } from '@clerk/nextjs'; // Clerk authentication hook

interface SavePlanProps {
  plan: Plan; // The current plan object
  onPlanSave: (plan: Plan) => Promise<void>; // Callback for saving
}

export default function SavePlan({ plan, onPlanSave }: SavePlanProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalSave = async (updatedPlan: Plan) => {
    try {
      await onPlanSave(updatedPlan);
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error('Failed to save plan:', error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-600 text-white text-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setIsModalOpen(true)} // Open the modal for editing
      >
        Save Plan
      </Button>

      {isModalOpen && (
        <SavePlanModal
          plan={plan}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave} // Pass the callback to save changes
        />
      )}
    </>
  );
}
