import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { verifyAdminToken } from '@/lib/auth';
import Contact from '@/models/Contact';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : null;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await verifyAdminToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // The token is valid, but make sure the account still exists.
    const user = await User.findById(userId).select('_id');
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await Contact.find({}).sort({ createdAt: -1 }).lean();

    const formattedMessages = messages.map((msg) => ({
      id: String(msg._id),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      createdAt: msg.createdAt,
    }));

    return NextResponse.json(formattedMessages, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
