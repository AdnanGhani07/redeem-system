import { NextRequest, NextResponse } from 'next/server';
import RedeemCode from '@/models/RedeemCode';
import { dbConnect } from '@/lib/mongodb';
import { requireAuth } from '@/middlewares/auth';

export async function POST(req: NextRequest) {
  await dbConnect();
  const user = requireAuth(req, true);
  if (!user) return NextResponse.json({ message: 'Admin only' }, { status: 403 });
  const { code, codeType, redemptionLimit, expiryDate } = await req.json();

  if (!code || !codeType || !expiryDate || (codeType === 'common' && !redemptionLimit)) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const newCode = new RedeemCode({
    code,
    codeType,
    redemptionLimit: codeType === 'common' ? redemptionLimit : undefined,
    expiryDate,
    status: 'active',
    redeemedBy: [],
  });
  await newCode.save();
  return NextResponse.json(newCode, { status: 201 });
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const user = requireAuth(req, true);
  if (!user) return NextResponse.json({ message: 'Admin only' }, { status: 403 });
  const codes = await RedeemCode.find().populate('redeemedBy', 'email');
  return NextResponse.json(codes);
}
