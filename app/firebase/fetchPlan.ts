// src/firebase/fetchPlans.ts
import { collection, getDocs, query, where } from 'firebase/firestore';

import { Plan } from '@/types/firestore';
import { db } from './firebase';


export async function fetchPlans(userId: string): Promise<Plan[]> {
  try {
    const q = query(collection(db, 'plans'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as unknown as Plan[];
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
}
