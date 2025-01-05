import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('University');

    const plans = await db.collection('plans').find({ userId }).toArray();

    return NextResponse.json({ success: true, plans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('University');
    const plan = await request.json();

    if (!plan.userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId in plan' },
        { status: 400 }
      );
    }

    // Remove `_id` if it exists but is invalid
    if (plan._id === '' || plan._id === undefined || plan._id === null) {
      delete plan._id;
    }

    const result = await db.collection('plans').insertOne({
      ...plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const newPlan = await db.collection('plans').findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, plan: newPlan });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save plan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { planId: string } }) {
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

    // Parse the request body
    const body = await request.json();
    console.log('Received request body:', body);

    // Remove `_id` and `createdAt` from the update body
    const { _id, createdAt, ...updateFields } = body;

    // Update the plan in the database
    const result = await db.collection('plans').updateOne(
      { _id: new ObjectId(planId) },
      { $set: { ...updateFields, updatedAt: new Date().toISOString() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Return the updated plan
    const updatedPlan = await db.collection('plans').findOne({ _id: new ObjectId(planId) });
    return NextResponse.json({ success: true, plan: updatedPlan });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const planId = url.searchParams.get('planId');

    if (!planId || !ObjectId.isValid(planId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing planId' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('University');

    const result = await db.collection('plans').deleteOne({ _id: new ObjectId(planId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}