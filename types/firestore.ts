export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  section?: string;
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
  userId: string;
  planName: string;
  requiredCredits: number; // Total credits required for the plan
  totalCredits: number; // Total credits across all semesters
  semesters: Semester[];
  createdAt: string;
  updatedAt: string;
}