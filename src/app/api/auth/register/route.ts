import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password, role } = await req.json();

  if (!email || !password)
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 });

  // Only allow 'user' role to be chosen by default, unless you want open admin registration!
  if (role && role !== 'user')
    return NextResponse.json({ message: 'Admin registration not allowed here' }, { status: 403 });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return NextResponse.json({ message: 'Email already registered' }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashed,
    role: 'user'
  });

  await newUser.save();
  return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
}
