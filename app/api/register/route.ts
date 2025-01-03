

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/user';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error during registration: ', error);
    return NextResponse.json(
      { message: 'Error during registration' },
      { status: 500 }
    );
  }
}

function connectMongoDB() {
    throw new Error('Function not implemented.');
}
