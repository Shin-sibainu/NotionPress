// pages/api/stripe/check-payment-and-blog-status.ts

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Stripeセッションの取得
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // 支払い状態の確認
    const paymentStatus = session.payment_status;

    // セッションからStripe Customer IDを取得
    const stripeCustomerId = session.customer as string;

    if (!stripeCustomerId) {
      console.error("Stripe Customer ID not found in session:", session_id);
      return NextResponse.json(
        {
          error: "Stripe Customer ID not found in session",
          paymentStatus: paymentStatus,
        },
        { status: 400 }
      );
    }

    // Stripe Customer IDを使用してユーザーを特定
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, domain")
      .eq("stripe_customer_id", stripeCustomerId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // blog_meta_dataテーブルからユーザーのブログメタデータを確認
    const { data: blogMetaData, error: blogError } = await supabase
      .from("blog_meta_data")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(); // .single() の代わりに .maybeSingle() を使用

    if (blogError) {
      console.error("Error fetching blog meta data:", blogError);
      return NextResponse.json(
        { error: "Failed to fetch blog status" },
        { status: 500 }
      );
    }

    const blogStatus = blogMetaData ? "created" : "not_created";

    return NextResponse.json(
      {
        paymentStatus,
        blogStatus,
        domain: user.domain,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking payment and blog status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
