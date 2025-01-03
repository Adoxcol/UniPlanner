'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnrolledCourse } from '@/types/course';

const formSchema = z.object({
  code: z.string().min(2, 'Course code is required'),
  name: z.string().min(2, 'Course name is required'),
  credits: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Credits must be greater than 0'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  section: z.string().min(1, 'Section is required'),
  classroom: z.string().min(1, 'Classroom is required'),
  time: z.string().min(1, 'Time is required'),
});

interface AddEnrolledCourseFormProps {
  onSubmit: (course: EnrolledCourse) => void;
}

export function AddEnrolledCourseForm({ onSubmit }: AddEnrolledCourseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      name: '',
      credits: '',
      difficulty: 'Medium',
      section: '',
      classroom: '',
      time: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const course: EnrolledCourse = {
      code: values.code,
      name: values.name,
      credits: Number(values.credits),
      difficulty: values.difficulty as 'Easy' | 'Medium' | 'Hard',
      section: values.section,
      classroom: values.classroom,
      time: values.time,
      grade: 'Z',
      id: undefined
    };

    onSubmit(course);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="CS101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to Programming" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="credits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credits</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl>
                  <Input placeholder="A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classroom</FormLabel>
                <FormControl>
                  <Input placeholder="Room 101" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input placeholder="Mon/Wed 10:00-11:20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Add Course</Button>
      </form>
    </Form>
  );
}