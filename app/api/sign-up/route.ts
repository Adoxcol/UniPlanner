import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

export async function POST(request: Request) {
  const { clerkUserId, firstName, lastName, userType, university } = await request.json()

  try {
    await client.connect()
    const db = client.db('University') // Replace with your database name
    const usersCollection = db.collection('users')

    // Save additional user data
    await usersCollection.insertOne({
      clerkUserId,
      firstName,
      lastName,
      userType,
      university,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: 'User data saved successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user data' }, { status: 500 })
  } finally {
    await client.close()
  }
}