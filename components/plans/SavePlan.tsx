'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plan } from '@/types/mongodb';
import SavePlanModal from './SavePlanModal'; // Import the SavePlanModal
import { useAuth } from '@clerk/nextjs'; // Import Clerk's useAuth hook

interface SavePlanProps {
  plan: Plan;
}

export default function SavePlan({ plan }: SavePlanProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useAuth(); // Get the authenticated user's ID

  return (
    <>
      <Button
        className="bg-blue-600 text-white text-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        Save Plan
      </Button>

      {isModalOpen && (
        <SavePlanModal
          plan={{ ...plan, userId }} // Pass the user ID to the modal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}