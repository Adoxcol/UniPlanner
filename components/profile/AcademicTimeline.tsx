'use client';

import { CheckCircle, Clock } from 'lucide-react';

const publicDegreePlans = [
  {
    name: 'Computer Science Degree Plan',
    status: 'completed',
    term: 'Fall 2023',
  },
  {
    name: 'Data Science Degree Plan',
    status: 'completed',
    term: 'Fall 2023',
  },
  {
    name: 'Artificial Intelligence Degree Plan',
    status: 'in-progress',
    term: 'Spring 2024',
  },
];

const AcademicTimeline = () => {
  return (
    <div className="bg-card dark:bg-card rounded-lg shadow-lg p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-foreground dark:text-foreground">Public Degree Plans</h2>
      <div className="space-y-4">
        {publicDegreePlans.map((plan, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg border border-border dark:border-border transition-all duration-300 hover:shadow-md"
          >
            <div className="p-2 rounded-full bg-primary/10">
              {plan.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-secondary" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-foreground dark:text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground">{plan.term}</p>
                </div>
              </div>
              {plan.status === 'in-progress' && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-secondary h-1.5 rounded-full w-1/2"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicTimeline;