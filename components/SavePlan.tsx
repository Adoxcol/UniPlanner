// src/components/SavePlan.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plan } from '@/types/firestore';
import savePlan from '@/app/firebase/savePlan'; // Make sure the path is correct
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SavePlanProps {
  plan: Plan; // Current plan to be saved
}

export default function SavePlan({ plan }: SavePlanProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [planName, setPlanName] = useState(plan.planName || ''); // Track plan name input
  const [universityName, setUniversityName] = useState(''); // Track university name input
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const [saveStatus, setSaveStatus] = useState<string | null>(null); // Track success/error status

  const handleSave = async () => {
    if (!planName || !universityName) {
      setSaveStatus('Please fill in both the plan name and university name.');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const updatedPlan = {
        ...plan,
        planName,
        universityName,
        updatedAt: new Date().toISOString(),
      };

      // Save the plan to Firestore
      await savePlan(updatedPlan);
      setSaveStatus('Plan saved successfully!'); // Success message
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error saving plan:', error);
      setSaveStatus('Failed to save plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Save Button to Open Modal */}
      <Button
        className="bg-blue-600 text-white text-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        Save Plan
      </Button>

      {/* Save Plan Modal */}
      {isModalOpen && (
        <Dialog open onOpenChange={() => setIsModalOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Your Degree Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
                  Plan Name
                </label>
                <Input
                  id="planName"
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter plan name"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
                  University Name
                </label>
                <Input
                  id="universityName"
                  type="text"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  placeholder="Enter university name"
                  className="mt-1"
                />
              </div>
              {saveStatus && (
                <p
                  className={`text-sm ${
                    saveStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {saveStatus}
                </p>
              )}
              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white">
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
