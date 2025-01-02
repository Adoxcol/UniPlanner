// src/components/SavePlan.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plan } from '@/types/firestore';
import savePlan from '@/app/firebase/savePlan'; // Make sure the path is correct

interface SavePlanProps {
  plan: Plan; // Current plan to be saved
}

export default function SavePlan({ plan }: SavePlanProps) {
  const [isSaving, setIsSaving] = useState(false); // Track the saving state
  const [saveStatus, setSaveStatus] = useState<string | null>(null); // Track success/error status

  const handleSave = async () => {
    setIsSaving(true); // Indicate saving state
    setSaveStatus(null); // Reset status message

    try {
      // Save the plan to Firestore
      await savePlan(plan);
      setSaveStatus('Plan saved successfully!'); // Success message
    } catch (error) {
      console.error('Error saving plan:', error);
      setSaveStatus('Failed to save plan. Please try again.'); // Error message
    } finally {
      setIsSaving(false); // Reset saving state
    }
  };

  return (
    <div className="">
      <Button
        className="bg-blue-600 text-white text-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Plan'}
      </Button>
      {saveStatus && (
        <p
          className={`mt-2 text-sm ${
            saveStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {saveStatus}
        </p>
      )}
    </div>
  );
}
