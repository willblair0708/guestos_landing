import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import type { Stripe as StripeType } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QU9jo03FtqvnkTMsheFdZF6',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://calendly.com/guestos_ai`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const error = err as StripeType.errors.StripeError;
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}