'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface TotalCreditsProps {
  semesters?: { courses: { credits: number | string }[] }[];
  requiredCredits: number | null;
  setRequiredCredits: (credits: number) => void; // Callback to update required credits
}

export function TotalCredits({ semesters = [], requiredCredits, setRequiredCredits }: TotalCreditsProps) {
  const [totalCredits, setTotalCredits] = useState(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [showRequiredCredits, setShowRequiredCredits] = useState(false);

  useEffect(() => {
    const calculatedTotal = semesters.reduce(
      (semesterSum, semester) =>
        semesterSum +
        (semester.courses?.reduce(
          (courseSum, course) => courseSum + Number(course.credits || 0), // Convert credits to a number
          0
        ) || 0),
      0
    );
    setTotalCredits(calculatedTotal);
  }, [semesters]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue !== '') {
      const parsedCredits = parseInt(inputValue, 10);
      setRequiredCredits(parsedCredits); // Update required credits via callback
      setShowRequiredCredits(true);
      setInputValue('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-1 mb-4"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-white" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                {showRequiredCredits && requiredCredits !== null ? 'Required Credits' : 'Enter Required Credits'}
              </h2>
            </div>
            {showRequiredCredits && requiredCredits !== null && (
              <motion.span
                key={requiredCredits}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white tracking-tight"
              >
                {requiredCredits}
              </motion.span>
            )}
          </div>
          {!showRequiredCredits && (
            <div className="mt-3">
              <label htmlFor="requiredCredits" className="block text-sm font-medium text-gray-100 mb-1">
                Enter the required credits and press Enter
              </label>
              <input
                id="requiredCredits"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., 120"
                className="mt-1 block w-full max-w-xs text-center rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>
        <div className="px-4 py-5 sm:px-6 bg-blue-800 bg-opacity-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">Total Credits</h2>
            <motion.span
              key={totalCredits}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white tracking-tight"
            >
              {totalCredits}
            </motion.span>
          </div>
          <p className="mt-2 text-xs text-blue-100">
            This total includes all credits from your registered courses across all semesters.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
