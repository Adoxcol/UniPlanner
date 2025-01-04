import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { planId: string; semesterId: string } }
) {
  try {
    const { planId, semesterId } = params;

    console.log('Received request with planId:', planId, 'and semesterId:', semesterId);

    if (!planId || !semesterId) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing Plan ID or Semester ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('University');

    // Fetch the plan
    const plan = await db.collection('plans').findOne({ _id: new ObjectId(planId) });

    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    console.log('Plan found:', plan);

    // Find the semester by semesterId
    const semester = plan.semesters?.find((sem: { id: string }) => sem.id === semesterId);

    if (!semester) {
      return NextResponse.json(
        { success: false, error: 'Semester not found' },
        { status: 404 }
      );
    }

    console.log('Semester found:', semester);

    return NextResponse.json({ success: true, courses: semester.courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
