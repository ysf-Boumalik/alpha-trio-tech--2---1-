import { NextRequest, NextResponse } from 'next/server';
import { verifySignature } from '@/utils/hmac';

export async function POST(request: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('X-SIGN');

  if (!signature) {
    console.warn('Missing X-SIGN header');
    return NextResponse.json({ error: 'Unauthorized: Missing signature' }, { status: 401 });
  }

  const isValid = verifySignature(body, signature, secret);
  if (!isValid) {
    console.warn('Invalid X-SIGN signature');
    return NextResponse.json({ error: 'Unauthorized: Invalid signature' }, { status: 401 });
  }

  try {
    const payload = JSON.parse(body);
    console.log('Booking webhook received:', payload);
    // Here, you can forward to CRM or store in DB if needed
  } catch (error) {
    console.error('Invalid JSON payload:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}