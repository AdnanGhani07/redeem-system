import { NextRequest, NextResponse } from 'next/server';
import RedeemCode from "@/models/RedeemCode";
import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/middlewares/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  const user = requireAuth(req, true); // admin only
  if (!user) return NextResponse.json({ message: "Admin only" }, { status: 403 });

  const { code, codeType, redemptionLimit, expiryDate } = await req.json();

  if (!code || !codeType || !expiryDate || (codeType === "common" && !redemptionLimit)) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const newCode = new RedeemCode({
    code,
    codeType,
    redemptionLimit: codeType === "common" ? redemptionLimit : undefined,
    expiryDate,
    status: "active",
    redeemedBy: [],
  });
  await newCode.save();
  return NextResponse.json(newCode, { status: 201 });
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = req.nextUrl;
  const isActiveQuery = searchParams.get("active") === "true";

  // If active codes (list for redeem page)
  if (isActiveQuery) {
    // Anyone can access
    const codes = await RedeemCode.find({
      status: "active",
      expiryDate: { $gte: new Date() }
    }).select("code codeType redemptionLimit expiryDate status");
    return NextResponse.json(codes);
  }

  // Otherwise: admin only (full info, with who-redeemed)
  const user = requireAuth(req, true);
  if (!user) return NextResponse.json({ message: "Admin only" }, { status: 403 });

  const codes = await RedeemCode.find()
    .populate('redeemedBy', 'email'); // << Populate users who redeemed

  return NextResponse.json(codes);
}
