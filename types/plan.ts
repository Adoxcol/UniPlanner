import { Semester } from "./semester";

export interface Plan {
  userId: string;
  planName: string;
  requiredCredits: number; // Total credits required for the plan
  totalCredits: number; // Total credits across all semesters
  semesters: Semester[];
  createdAt: string;
  updatedAt: string;
}
