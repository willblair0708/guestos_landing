import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, companyName, priceId } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
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
      subscription_data: {
        trial_period_days: 14,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 