import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get all messages, sorted by newest first
    const messages = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
