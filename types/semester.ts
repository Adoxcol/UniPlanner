import { Course } from "./course";

export interface Semester {
    id: string; // Unique ID for the semester
    name: string; // Name of the semester (e.g., Fall 2023)
    totalCredits: number; // Total credits for the semester (calculated dynamically)
    courses: Course[]; // List of courses in this semester
  }