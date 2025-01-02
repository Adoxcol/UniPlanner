export interface University {
    id: string; // Firestore document ID
    universities_name: string;
    universities_short_name: string;
    location?: string; // Optional field
    website?: string; // Optional field
  }