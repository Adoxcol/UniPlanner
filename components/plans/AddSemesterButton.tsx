'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddSemesterButtonProps {
  onAddSemester: (semesterName: string) => void
}

export function AddSemesterButton({ onAddSemester }: AddSemesterButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [semesterName, setSemesterName] = useState('')

  const handleAddSemester = () => {
    if (semesterName.trim()) {
      onAddSemester(semesterName.trim())
      setSemesterName('')
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Semester
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Semester</DialogTitle>
          <DialogDescription>
            Enter the name of the new semester you'd like to add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="semester-name" className="text-right">
              Name
            </Label>
            <Input
              id="semester-name"
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Fall 2023"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddSemester} type="submit">Add Semester</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

