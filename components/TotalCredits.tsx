'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface TotalCreditsProps {
  semesters?: { courses: { credits: number }[] }[];
}

export function TotalCredits({ semesters = [] }: TotalCreditsProps) {
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    const calculatedTotal = semesters.reduce(
      (semesterSum, semester) =>
        semesterSum + (semester.courses?.reduce((courseSum, course) => courseSum + (course.credits || 0), 0) || 0),
      0
    );
    setTotalCredits(calculatedTotal);
  }, [semesters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-1 mb-4"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-white" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white tracking-tight">Total Credits</h2>
            </div>
            <div className="flex items-baseline text-white">
              <motion.span
                key={totalCredits}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tight"
              >
                {totalCredits}
              </motion.span>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 bg-blue-800 bg-opacity-50 sm:px-6 sm:py-3">
          <div className="text-xs text-blue-100">
            <p>Track your academic progress with ease. This total includes all credits from your registered courses across all semesters.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
