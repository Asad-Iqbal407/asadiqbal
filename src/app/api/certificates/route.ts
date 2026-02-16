import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

export async function GET() {
  try {
    await dbConnect();
    const certificates = await Certificate.find({}).sort({ date: -1 });
    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
