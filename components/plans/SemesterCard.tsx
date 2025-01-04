'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Course, Difficulty } from '@/types/mongodb';
import { calculateGPA } from '@/utils/calculateGPA';

export function SemesterCard({
  semesterId,
  semesterName = 'Semester',
  courses = [],
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}: {
  semesterId: string;
  semesterName: string;
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (code: string) => void;
}) {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  const gpa = useMemo(() => calculateGPA(courses), [courses]);

  const handleCourseSubmit = (course: Course) => {
    if (!editingCourse && courses.some((c) => c.code === course.code)) {
      alert('Course with this code already exists.');
      return;
    }

    if (editingCourse) {
      onEditCourse(course);
    } else {
      onAddCourse(course);
    }
    setIsAddingCourse(false);
    setEditingCourse(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{semesterName}</CardTitle>
        <CardDescription>Manage your courses for this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Classroom</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {courses.map((course) => (
                <CourseRow
                  key={course.code}
                  course={course}
                  onEdit={() => setEditingCourse(course)}
                  onDelete={() => onDeleteCourse(course.code)}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <Button onClick={() => setIsAddingCourse(true)} disabled={isAddingCourse}>
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </Button>
          <div>
            <p>GPA: {gpa || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
      {(isAddingCourse || editingCourse) && (
        <CourseForm
          course={editingCourse || undefined}
          onSubmit={handleCourseSubmit}
          onCancel={() => {
            setIsAddingCourse(false);
            setEditingCourse(null);
          }}
        />
      )}
    </Card>
  );
}

function CourseRow({ course, onEdit, onDelete }: { course: Course; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <TableCell>{course.code}</TableCell>
      <TableCell>{course.name}</TableCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.difficulty}</TableCell>
      <TableCell>{course.section || '-'}</TableCell>
      <TableCell>{course.time || '-'}</TableCell>
      <TableCell>{course.classroom || '-'}</TableCell>
      <TableCell>{course.grade || '-'}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </motion.tr>
  );
}

function CourseForm({ course, onSubmit, onCancel }: { course?: Course; onSubmit: (course: Course) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Course>(
    course || {
      id: 'default-id',
      code: '',
      name: '',
      credits: 0,
      difficulty: 'Medium',
      section: '',
      time: '',
      classroom: '',
      grade: '',
    }
  );

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'grade') {
      const validGradePattern = /^[A-F][+-]?$/i;
      if (value === '' || validGradePattern.test(value)) {
        setFormData({ ...formData, [name]: value });
        setError(null);
      } else {
        setError('Invalid grade. Please enter a valid grade like A, B+, or C-.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.grade && error) {
      alert('Please fix the errors before submitting.');
      return;
    }

    onSubmit(formData);
    setFormData({
      id: '',
      code: '',
      name: '',
      credits: 0,
      difficulty: 'Medium',
      section: '',
      time: '',
      classroom: '',
      grade: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-secondary rounded-lg mt-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Course Code" id="code" name="code" value={formData.code} onChange={handleChange} required />
          <InputField label="Course Name" id="name" name="name" value={formData.name} onChange={handleChange} required />
          <InputField
            label="Credits"
            id="credits"
            name="credits"
            type="number"
            value={formData.credits}
            onChange={handleChange}
            required
          />
          <DifficultySelect value={formData.difficulty} onChange={(value: Difficulty) => setFormData({ ...formData, difficulty: value })} />
          <InputField label="Section (Optional)" id="section" name="section" value={formData.section || ''} onChange={handleChange} />
          <InputField label="Time (Optional)" id="time" name="time" value={formData.time || ''} onChange={handleChange} />
          <InputField label="Grade (Optional)" id="grade" name="grade" value={formData.grade || ''} onChange={handleChange} />
          <InputField label="Classroom (Optional)" id="classroom" name="classroom" value={formData.classroom || ''} onChange={handleChange} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" /> {course ? 'Update' : 'Add'} Course
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
    </div>
  );
}

function DifficultySelect({ value, onChange }: { value: Difficulty; onChange: (value: Difficulty) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="difficulty">Difficulty</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
