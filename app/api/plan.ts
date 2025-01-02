import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // MongoDB client

export const dynamic = 'force-dynamic';

async function saveDegreePlan(plan: any) {
  if (!plan.planName) {
    return NextResponse.json(
      { error: 'Plan name is required.' },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db('UniversityPlans'); // Ensure the correct database is used

  try {
    // Insert the plan into the degreePlans collection
    const result = await db.collection('degreePlans').insertOne({
      ...plan, // Spread the provided fields, including optional ones
      createdAt: new Date().toISOString(), // Automatically set createdAt timestamp
      updatedAt: new Date().toISOString(), // Automatically set updatedAt timestamp
    });

    // If insertion is successful, return the inserted document's ID
    return NextResponse.json({ success: true, planId: result.insertedId });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
  }
}

// Named export for the POST method to save a degree plan
export async function POST(request: Request) {
  try {
    const plan = await request.json();
    return await saveDegreePlan(plan);
  } catch (error) {
    console.error('Error in POST method:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
