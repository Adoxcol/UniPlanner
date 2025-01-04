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

    // Fetch plans for the given userId
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

    // Remove `_id` if it exists and is empty or undefined
    if (plan._id === '' || plan._id === undefined || plan._id === null) {
      delete plan._id;
    }

    // Insert the plan into the database
    const result = await db.collection('plans').insertOne({
      ...plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const newPlan = await db
      .collection('plans')
      .findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, plan: newPlan });
  } catch (error) {
    console.error('Error saving plan:', error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Duplicate key error. The plan already exists.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'An error occurred while saving the plan.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('University');
    const updatedPlan = await request.json();

    if (!updatedPlan._id) {
      return NextResponse.json(
        { success: false, error: 'Missing _id in plan' },
        { status: 400 }
      );
    }

    const result = await db.collection('plans').updateOne(
      { _id: new ObjectId(updatedPlan._id) },
      {
        $set: {
          ...updatedPlan,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    const updatedPlanFromDB = await db
      .collection('plans')
      .findOne({ _id: new ObjectId(updatedPlan._id) });

    return NextResponse.json({ success: true, plan: updatedPlanFromDB });
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

    if (!planId) {
      return NextResponse.json(
        { success: false, error: 'Missing planId' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('University');

    const result = await db
      .collection('plans')
      .deleteOne({ _id: new ObjectId(planId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}
