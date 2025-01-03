import { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-4 border border-border dark:border-dark-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground dark:text-dark-foreground">
          {course.code} - {course.name}
        </h3>
        <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
          Credits: {course.credits} • Difficulty: {course.difficulty}
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
            Section: {course.section || 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
            Time: {course.time || 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
            Classroom: {course.classroom || 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
            Grade: {course.grade || 'N/A'}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}