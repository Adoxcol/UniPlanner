import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request, { params }: { params: { planId: string } }) {
  try {
    const { planId } = params;

    // Validate Plan ID
    if (!planId || !ObjectId.isValid(planId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Plan ID format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('University');

    // Parse request body
    const body = await request.json();
    console.log('Received request body:', body);

    // Remove _id field to prevent modification of immutable field
    if (body._id) {
      delete body._id;
    }

    if (!body || typeof body !== 'object' || !Object.keys(body).length) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing data in request body' },
        { status: 400 }
      );
    }

    // Update plan in database
    const result = await db.collection('plans').updateOne(
      { _id: new ObjectId(planId) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Plan updated successfully' });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}
