import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
      success_url: `${req.headers.get('origin')}/?success=true`,
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