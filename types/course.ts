export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  difficulty: Difficulty;
  section?: string;
  time?: string;
  grade?: string;
  classroom?: string;
}

export interface SemesterCardProps {
  semesterName: string;
  courses: Course[];
}

