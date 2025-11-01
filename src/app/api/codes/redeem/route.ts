import { NextRequest, NextResponse } from 'next/server';
import RedeemCode from '@/models/RedeemCode';
import { dbConnect } from '@/lib/mongodb';
import { requireAuth } from '@/middlewares/auth';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { code } = await req.json();
  const user = requireAuth(req, false);
  if (!user) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  const redeemCode = await RedeemCode.findOne({ code });
  if (!redeemCode) return NextResponse.json({ message: 'Code not found' }, { status: 404 });

  // Expiry check
  if (redeemCode.status !== 'active' || new Date(redeemCode.expiryDate) < new Date()) {
    redeemCode.status = 'expired'; await redeemCode.save();
    return NextResponse.json({ message: 'Code expired' }, { status: 400 });
  }

  if (redeemCode.codeType === 'common') {
    if (redeemCode.redemptionLimit && redeemCode.redemptionLimit <= redeemCode.redeemedBy.length)
      return NextResponse.json({ message: 'Limit reached' }, { status: 400 });
    if (redeemCode.redeemedBy.includes(user.id))
      return NextResponse.json({ message: 'Already redeemed' }, { status: 400 });
    redeemCode.redeemedBy.push(user.id);
    await redeemCode.save();
    return NextResponse.json({ message: 'Redeemed successfully' }, { status: 200 });
  } else {
    if (redeemCode.redeemedBy.length > 0) return NextResponse.json({ message: 'Already redeemed' }, { status: 400 });
    redeemCode.redeemedBy.push(user.id);
    await redeemCode.save();
    return NextResponse.json({ message: 'Unique code redeemed successfully' }, { status: 200 });
  }
}
