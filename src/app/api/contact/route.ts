import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import Contact from '@/models/Contact';

const MAX_MESSAGES = 5;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // Honeypot: real visitors never see or fill this field, bots usually do.
    // Pretend it worked so the bot does not learn it was filtered.
    if (typeof body?.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 201 });
    }

    const limit = rateLimit(`contact:${clientIp(request)}`, MAX_MESSAGES, WINDOW_MS);
    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      );
    }

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    await dbConnect();
    const contact = await Contact.create({ name, email, message });

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: String(contact._id) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
