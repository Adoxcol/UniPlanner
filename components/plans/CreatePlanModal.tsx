'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CreatePlanModalProps {
  onClose: () => void;
  onCreatePlan: (newPlan: { planName: string; universityName?: string }) => Promise<string>; // Return the new plan ID
}

export default function CreatePlanModal({ onClose, onCreatePlan }: CreatePlanModalProps) {
  const [planName, setPlanName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleCreate = async () => {
    if (!planName) {
      alert('Plan name is required');
      return;
    }

    try {
      // Call the onCreatePlan function and get the new plan ID
      const newPlanId = await onCreatePlan({ planName, universityName });

      // Redirect to the Planner Page with the new plan ID
      router.push(`/planner/${newPlanId}`);
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan');
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Plan Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
          <Input
            placeholder="University Name (Optional)"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}