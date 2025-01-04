// GET /api/plans/[planId]/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB ID handling

export async function GET(request: Request, { params }: { params: { planId: string } }) {
  try {
    const { planId } = params;

    // Validate planId
    if (!planId || !ObjectId.isValid(planId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing Plan ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('University');

    // Convert planId to ObjectId
    const objectId = new ObjectId(planId);

    // Fetch the plan from the database
    const plan = await db.collection('plans').findOne({ _id: objectId });

    // Handle plan not found
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Return the plan
    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plan' },
      { status: 500 }
    );
  }
}