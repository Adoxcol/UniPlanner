'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plan } from '@/types/mongodb';

interface SavePlanProps {
  plan: Plan;
}

export default function SavePlan({ plan }: SavePlanProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState(plan.planName || '');
  const [universityName, setUniversityName] = useState(plan.universityName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

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
        requiredCredits: plan.requiredCredits,
        semesters: plan.semesters,
        totalCredits: plan.totalCredits || 0,
      };

      const response = await fetch('/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlan),
      });

      if (response.ok) {
        setSaveStatus('Plan saved successfully!');
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        setSaveStatus(`Failed to save plan: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      setSaveStatus('Failed to save plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-600 text-white text-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        Save Plan
      </Button>

      {isModalOpen && (
        <Dialog open onOpenChange={() => setIsModalOpen(false)} aria-describedby="plan-description">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Your Degree Plan</DialogTitle>
            </DialogHeader>
            <div id="plan-description" className="space-y-4">
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
                <p className={`text-sm ${saveStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
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