import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // MongoDB client

export const dynamic = 'force-dynamic';

// Fetch plans for a specific user
async function fetchPlans(userId: string) {
  const client = await clientPromise;
  const db = client.db('University');

  try {
    const plans = await db
      .collection('plans')
      .find({ userId }) // Fetch plans for the specific user
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .toArray();

    // Convert MongoDB ObjectId to string for serialization
    const serializedPlans = plans.map((plan) => ({
      ...plan,
      _id: plan._id.toString(), // Convert ObjectId to string
    }));

    return NextResponse.json({ success: true, plans: serializedPlans });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch plans' }, { status: 500 });
  }
}

// Save a new plan
async function savePlan(plan: any) {
  if (!plan.planName) {
    return NextResponse.json({ success: false, error: 'Plan name is required.' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('University');

  try {
    const result = await db.collection('plans').insertOne({
      ...plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, planId: result.insertedId.toString() }); // Convert ObjectId to string
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ success: false, error: 'Failed to save plan' }, { status: 500 });
  }
}

// GET method to fetch plans
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // Get userId from query parameters

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    return await fetchPlans(userId);
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}

// POST method to save a new plan
export async function POST(request: Request) {
  try {
    const plan = await request.json();
    return await savePlan(plan);
  } catch (error) {
    console.error('Error in POST method:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}