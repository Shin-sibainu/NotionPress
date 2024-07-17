// pages/api/create-checkout-session.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { setupData } = await req.json();

    // 価格IDはテンプレートIDに基づいて決定する必要があります
    const priceId = getPriceIdForTemplate(setupData.templateId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/setup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/setup`,
      metadata: {
        setupData: JSON.stringify(setupData),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// テンプレートIDに基づいて価格IDを取得する関数
function getPriceIdForTemplate(templateId: string): string {
  // ここで、テンプレートIDに基づいて適切な価格IDを返す
  // これは、データベースから取得するか、定数オブジェクトから取得する可能性があります
  const priceMap: { [key: string]: string } = {
    "2": "price_1PdQBRIhigL96OE6J8wC8F5k",
    "3": "price_YYYYYYYYYYYYYYYYYY",
    "4": "price_ZZZZZZZZZZZZZZZZZZ",
  };
  return priceMap[templateId] || "default_price_id";
}
