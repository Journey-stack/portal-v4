import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: NextRequest) {
  const { amount_usd } = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" as any });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price_data: { currency: "usd", product_data: { name: "Journey Wallet Top-Up" }, unit_amount: Math.round(amount_usd * 100) }, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/billing?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/billing?canceled=1`,
  });
  return NextResponse.json({ checkout_url: session.url });
}
