'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Course } from '@/types/course';

interface EditCourseModalProps {
  course: Course;
  onSave: (course: Course) => void;
  onClose: () => void;
}

export function EditCourseModal({ course, onSave, onClose }: EditCourseModalProps) {
  const [editedCourse, setEditedCourse] = useState<Course>(course);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedCourse);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="code">Course Code</Label>
            <Input
              id="code"
              value={editedCourse.code}
              onChange={(e) => setEditedCourse({ ...editedCourse, code: e.target.value })}
              placeholder="Enter course code"
            />
          </div>
          <div>
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              value={editedCourse.name}
              onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
              placeholder="Enter course name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                value={editedCourse.credits}
                onChange={(e) => setEditedCourse({ ...editedCourse, credits: Number(e.target.value) })}
                placeholder="Enter course credits"
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={editedCourse.difficulty}
                onValueChange={(value) =>
                  setEditedCourse({ ...editedCourse, difficulty: value as 'Easy' | 'Medium' | 'Hard' })
                }
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
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}