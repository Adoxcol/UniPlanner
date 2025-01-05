'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plan } from '@/types/mongodb';

interface SavePlanModalProps {
  plan: Plan;
  onClose: () => void;
  onSave: (updatedPlan: Plan) => Promise<void>;
}

export default function SavePlanModal({ plan, onClose, onSave }: SavePlanModalProps) {
  const [planName, setPlanName] = useState(plan.planName || '');
  const [universityName, setUniversityName] = useState(plan.universityName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!planName || !universityName) {
      setError('Plan name and university name are required.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const updatedPlan = {
        ...plan,
        planName,
        universityName,
        updatedAt: new Date().toISOString(),
      };

      await onSave(updatedPlan); // Save through the passed callback
      onClose(); // Close modal after saving
    } catch (err) {
      console.error('Error saving plan:', err);
      setError('Failed to save the plan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Degree Plan</DialogTitle>
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
              disabled={isSaving}
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
              disabled={isSaving}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
