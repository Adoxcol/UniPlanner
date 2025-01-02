import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
 // Path to your Firebase configuration

async function updatePlanCredits(userId: string, requiredCredits: number, totalCredits: number) {
  try {
    const planDoc = doc(db, "plans", userId); // Use the correct document ID
    await updateDoc(planDoc, {
      requiredCredits: requiredCredits,
      totalCredits: totalCredits,
      updatedAt: new Date().toISOString(), // Track when the update was made
    });
    console.log("Plan credits updated successfully!");
  } catch (error) {
    console.error("Error updating plan credits:", error);
  }
}
