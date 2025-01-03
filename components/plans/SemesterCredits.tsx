'use client';

interface SemesterCreditsProps {
  courses: { credits: number }[];
}

export function SemesterCredits({ courses }: SemesterCreditsProps) {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="text-sm font-bold text-black bg-gray-200 p-2 rounded text-center">
      Semester Credits: {totalCredits}
    </div>
  );
}
