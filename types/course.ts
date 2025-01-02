export interface Course {
  id: any;
  code: string;
  name: string;
  credits: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface EnrolledCourse extends Course {
  section: string;
  classroom: string;
  time: string;
  grade: string;
}