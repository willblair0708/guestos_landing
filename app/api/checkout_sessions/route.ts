import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';

// Initialize Stripe with strict type checking for API key
if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia', // Updated to latest API version
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json(); // Get the form data

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://calendly.com/guestos_ai`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      automatic_tax: { enabled: true },
      metadata: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        email: formData.email,
        phone: formData.phone,
        description: formData.description
      },
      customer_email: formData.email, // Pre-fill customer email
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const error = err as Stripe.errors.StripeError;
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}