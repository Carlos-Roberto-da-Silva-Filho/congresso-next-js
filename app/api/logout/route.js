import { NextResponse } from 'next/server';
import { removeSession } from '@/lib/session';

export async function POST() {
  await removeSession();
  return NextResponse.json({ success: true });
}
