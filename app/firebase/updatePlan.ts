// src/firebase/updatePlan.ts
import { doc, updateDoc } from 'firebase/firestore';

import { Plan } from '@/types/firestore';
import { db } from './firebase';


export async function updatePlan(planId: string, updatedData: Partial<Plan>): Promise<void> {
  const planRef = doc(db, 'plans', planId);

  try {
    await updateDoc(planRef, updatedData);
    console.log('Plan updated successfully');
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
}
