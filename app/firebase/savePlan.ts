// src/app/firebase/savePlan.ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Plan } from '@/types/firestore';

const savePlan = async (plan: Plan) => {
  const planRef = doc(db, 'plans', plan.userId); // Use userId or a unique ID for the document
  await setDoc(planRef, plan, { merge: true }); // Merge to update existing fields
};

export default savePlan;
