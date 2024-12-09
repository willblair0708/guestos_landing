import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error('Missing Stripe secret key');
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia'
});

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1QTu1603FtqvnkTMTlCEV9kt',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://calendly.com/guestos_ai',
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ message: err.message }, { status: err.statusCode || 500 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}