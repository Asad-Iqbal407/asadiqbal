import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json().catch(() => null);
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Create new contact entry
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: String(contact._id) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
