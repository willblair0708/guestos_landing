import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia' as const,
});

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is not set');
    }

    const body = await req.json();
    const { firstName, lastName, email, companyName, priceId } = body;

    console.log('Received price ID:', priceId);

    // Verify the price exists
    try {
      const price = await stripe.prices.retrieve(priceId);
      console.log('Price details:', price);
    } catch (err) {
      console.error('Error retrieving price:', err);
      return NextResponse.json(
        { error: 'Invalid price ID or price not found' },
        { status: 400 }
      );
    }

    if (!email || !priceId || !firstName || !lastName || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
          adjustable_quantity: {
            enabled: false
          }
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: {
        firstName,
        lastName,
        companyName,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offer`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    if (!session.id) {
      throw new Error('No session ID returned from Stripe');
    }

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Error creating checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 