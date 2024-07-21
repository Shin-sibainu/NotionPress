import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    let customerId = user?.stripe_customer_id;

    if (!customerId) {
      const newCustomer = await stripe.customers.create({
        metadata: { userId: userId },
      });
      customerId = newCustomer.id;

      await supabase
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    }

    const { setupData } = await req.json();

    // 価格IDはテンプレートIDに基づいて決定する必要があります
    const priceId = getPriceIdForTemplate(setupData.templateId);

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId, // ここでcustomerを設定
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/setup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/setup/cancel`,
      client_reference_id: userId,
      metadata: {
        setupData: JSON.stringify(setupData),
        userId: userId, // ユーザーIDをメタデータに追加
      },
    });

    console.log("Checkout session created:", checkoutSession.id);
    return NextResponse.json({ url: checkoutSession.url }, { status: 200 });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: err.message },
      { status: 500 }
    );
  }
}

function getPriceIdForTemplate(templateId: string): string {
  const priceMap: { [key: string]: string } = {
    "2": "price_1PdQBRIhigL96OE6J8wC8F5k",
    "3": "price_YYYYYYYYYYYYYYYYYY",
    "4": "price_ZZZZZZZZZZZZZZZZZZ",
  };
  const priceId = priceMap[templateId] || "default_price_id";
  if (priceId === "default_price_id") {
    console.warn(`Unknown template ID: ${templateId}`);
  }
  return priceId;
}
