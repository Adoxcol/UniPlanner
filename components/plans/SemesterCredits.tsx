'use client';

interface SemesterCreditsProps {
  courses: { credits: number | string }[]; // Handle string or number credits
}

export function SemesterCredits({ courses }: SemesterCreditsProps) {
  const totalCredits = courses.reduce((sum, course) => sum + Number(course.credits), 0); // Convert credits to numbers

  return (
    <div className="text-sm font-bold text-black bg-gray-200 p-2 rounded text-center">
      Semester Credits: {totalCredits}
    </div>
  );
}
