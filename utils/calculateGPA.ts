export function calculateGPA(courses: { credits: number; grade?: string }[]): number {
  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0,
  };

  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach(course => {
    const grade = course.grade?.toUpperCase();
    if (grade && grade in gradePoints) {
      totalCredits += course.credits || 0;
      totalGradePoints += (course.credits || 0) * gradePoints[grade];
    }
  });

  return totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;
}
