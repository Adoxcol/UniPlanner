'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Course } from '@/types/course';

const formSchema = z.object({
  code: z.string().min(2, 'Course code is required'),
  name: z.string().min(2, 'Course name is required'),
  credits: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Credits must be greater than 0'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  hasLab: z.boolean().default(false),
});

interface AddCourseFormProps {
  onSubmit: (course: Course) => void;
}

export function AddCourseForm({ onSubmit }: AddCourseFormProps) {
  const [hasLab, setHasLab] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      name: '',
      credits: '',
      difficulty: 'Medium',
      hasLab: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const course: Course = {
      code: values.code,
      name: values.name,
      credits: Number(values.credits),
      difficulty: values.difficulty as 'Easy' | 'Medium' | 'Hard',
    };

    onSubmit(course);

    if (values.hasLab) {
      const labCourse: Course = {
        code: `${values.code}L`,
        name: `${values.name} Lab`,
        credits: 1,
        difficulty: values.difficulty as 'Easy' | 'Medium' | 'Hard',
      };
      onSubmit(labCourse);
    }
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

        <FormField
          control={form.control}
          name="hasLab"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Has Lab Component</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Automatically add a 1-credit lab course
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Add Course</Button>
      </form>
    </Form>
  );
}