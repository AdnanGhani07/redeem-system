import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  role: 'admin' | 'user';
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest, requireAdmin = false): UserPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  const decoded = token ? verifyToken(token) : null;
  if (requireAdmin && decoded?.role !== 'admin') return null;
  return decoded;
}
