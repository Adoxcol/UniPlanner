// Define the Difficulty type as a union of specific strings
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  difficulty: Difficulty; // Use the exported Difficulty type
  section?: string;
  classroom?: string;
  time?: string;
  grade?: string;
}

export interface Semester {
  id: string;
  name: string;
  totalCredits: number; // Total credits for this semester
  courses: Course[];
}

export interface Plan {
  _id: string;
  userId: string;
  planName: string;
  universityName?: string;
  requiredCredits: number; // Total credits required for the plan
  totalCredits: number; // Total credits across all semesters
  semesters: Semester[];
  createdAt: string;
  updatedAt: string;
}

export interface University {
  id: string; 
  universities_name: string;
  universities_short_name: string;
  location?: string; // Optional field
  website?: string; // Optional field
}