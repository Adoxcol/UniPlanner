// /app/api/plans/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // MongoDB client

export const dynamic = 'force-dynamic';

async function savePlan(plan: any) {
  if (!plan.planName) {
    return NextResponse.json({ error: 'Plan name is required.' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('University');

  try {
    const result = await db.collection('plans').insertOne({
      ...plan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, planId: result.insertedId });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const plan = await request.json();
    return await savePlan(plan);
  } catch (error) {
    console.error('Error in POST method:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
