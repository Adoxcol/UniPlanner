'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Course } from '@/types/mongodb';
import { calculateGPA } from '@/app/utils/calculateGPA';
import { Difficulty, SemesterCardProps } from '@/types/course';

export function SemesterCard({ semesterName, planId }: { semesterName: string; planId: string }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  useEffect(() => {
    // Fetch courses for the specific semester and plan
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/plans/${planId}/semesters/${semesterName}/courses`);
        const data = await response.json();

        if (data.success) {
          setCourses(data.courses);
        } else {
          console.error('Failed to fetch courses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [planId, semesterName]);

  const gpa = useMemo(() => calculateGPA(courses), [courses]);

  const handleAddCourse = (course: Course) => {
    setCourses([...courses, course]);
    setIsAddingCourse(false);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(c => c.code === updatedCourse.code ? updatedCourse : c));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (code: string) => {
    setCourses(courses.filter(c => c.code !== code));
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
                  onDelete={() => handleDeleteCourse(course.code)}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <Button onClick={() => setIsAddingCourse(true)} disabled={isAddingCourse}>
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </Button>
          <div className="text-lg font-semibold">
            GPA: <span className="text-primary">{gpa}</span>
          </div>
        </div>
      </CardContent>
      {(isAddingCourse || editingCourse) && (
        <CourseForm
          course={editingCourse || undefined}
          onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
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
      code: '',
      name: '',
      credits: 0,
      difficulty: 'Medium',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          <div className="space-y-2">
            <Label htmlFor="code">Course Code</Label>
            <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credits">Credits</Label>
            <Input id="credits" name="credits" type="number" value={formData.credits} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value: Difficulty) => setFormData({ ...formData, difficulty: value })}
            >
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
          <div className="space-y-2">
            <Label htmlFor="section">Section (Optional)</Label>
            <Input id="section" name="section" value={formData.section || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time (Optional)</Label>
            <Input id="time" name="time" value={formData.time || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Grade (Optional)</Label>
            <Input id="grade" name="grade" value={formData.grade || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="classroom">Classroom (Optional)</Label>
            <Input id="classroom" name="classroom" value={formData.classroom || ''} onChange={handleChange} />
          </div>
        </div>
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