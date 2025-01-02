'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Course } from '@/types/course';
import { useState } from 'react';

interface CourseCardProps extends Course {
  onDelete: () => void;
  onEdit: (updatedCourse: Course) => void;
  isEditing: boolean;
  onEditClick: () => void; // New prop to handle Edit button click
}

export function CourseCard({ code, name, credits, difficulty, onDelete, onEdit, isEditing, onEditClick }: CourseCardProps) {
  const [editedCode, setEditedCode] = useState(code);
  const [editedName, setEditedName] = useState(name);
  const [editedCredits, setEditedCredits] = useState(credits);
  const [editedDifficulty, setEditedDifficulty] = useState(difficulty);

  const handleSave = () => {
    onEdit({
        code: editedCode,
        name: editedName,
        credits: editedCredits,
        difficulty: editedDifficulty,
        id: undefined
    });
  };

  return (
    <div className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow min-w-[250px]">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            className="w-full p-1 border rounded"
            placeholder="Course Code"
          />
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full p-1 border rounded"
            placeholder="Course Name"
          />
          <input
            type="number"
            value={editedCredits}
            onChange={(e) => setEditedCredits(parseInt(e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="Credits"
          />
          <select
            value={editedDifficulty}
            onChange={(e) => setEditedDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
            className="w-full p-1 border rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex-1 truncate">
            <h3 className="font-semibold truncate">{code}</h3>
            <p className="text-sm text-muted-foreground truncate">{name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onEditClick} className="p-2">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="p-2">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <div className="mt-2 flex items-center gap-2">
        <Badge variant="outline">{credits} cr</Badge>
        <Badge variant={difficulty === 'Hard' ? 'destructive' : difficulty === 'Medium' ? 'warning' : 'default'}>
          {difficulty}
        </Badge>
      </div>
    </div>
  );
}