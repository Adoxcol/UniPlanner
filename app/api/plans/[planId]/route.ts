// GET /api/plans/[planId]
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { planId: string } }) {
  try {
    const { planId } = params;

    if (!planId) {
      return NextResponse.json({ success: false, error: 'Plan ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('University');
    const plan = await db.collection('plans').findOne({ _id: planId });

    if (!plan) {
      return NextResponse.json({ success: false, error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch plan' }, { status: 500 });
  }
}