import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

const uri = process.env.MONGO_DB_URL!
const client = new MongoClient(uri)

export async function POST(request: Request) {
  const payload = await request.json()
  const headerList = headers()
  const svixId = headerList.get('svix-id')
  const svixSignature = headerList.get('svix-signature')
  const svixTimestamp = headerList.get('svix-timestamp')

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)
  let event

  try {
    event = wh.verify(payload, {
      'svix-id': svixId!,
      'svix-signature': svixSignature!,
      'svix-timestamp': svixTimestamp!,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 })
  }

  try {
    await client.connect()
    const db = client.db('myapp') // Replace with your database name
    const usersCollection = db.collection('users')

    switch (event.type) {
      case 'user.created':
        // Save user data to MongoDB
        await usersCollection.insertOne({
          clerkUserId: event.data.id,
          email: event.data.email_addresses[0].email_address,
          firstName: event.data.first_name,
          lastName: event.data.last_name,
          createdAt: new Date(),
        })
        break

      case 'user.updated':
        // Update user data in MongoDB
        await usersCollection.updateOne(
          { clerkUserId: event.data.id },
          {
            $set: {
              email: event.data.email_addresses[0].email_address,
              firstName: event.data.first_name,
              lastName: event.data.last_name,
              updatedAt: new Date(),
            },
          }
        )
        break

      case 'user.deleted':
        // Delete user data from MongoDB
        await usersCollection.deleteOne({ clerkUserId: event.data.id })
        break
    }

    return NextResponse.json({ message: 'Webhook received' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  } finally {
    await client.close()
  }
}