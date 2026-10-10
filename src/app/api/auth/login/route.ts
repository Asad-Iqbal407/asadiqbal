import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { signAdminToken } from '@/lib/auth';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import User from '@/models/User';

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

// Compared against when the email is unknown, so response time does not reveal
// whether an account exists.
let dummyHash: string | null = null;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync('not-a-real-password', 10));

export async function POST(request: NextRequest) {
  const limit = rateLimit(`login:${clientIp(request)}`, MAX_ATTEMPTS, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password || email.length > 254 || password.length > 200) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password ?? getDummyHash());

    if (!user || !isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signAdminToken(String(user._id));

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        id: String(user._id),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
