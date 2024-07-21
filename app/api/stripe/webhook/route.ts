import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  SupabaseClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBuffer = Buffer.from(await req.arrayBuffer());
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const setupData = JSON.parse(session.metadata?.setupData || "{}");
      const userId = session.client_reference_id;

      if (!userId) {
        throw new Error("User ID not found in session");
      }

      try {
        // await createBlog(setupData);
        await processUserData(supabase, userId, setupData);
        console.log("Blog creation initiated for session:", session.id);
      } catch (error) {
        console.error("Error creating blog:", error);
        // ここでエラーハンドリングを行う（例：管理者に通知を送る）
      }
      break;

    case "payment_intent.payment_failed":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment failed:", paymentIntent.id);
      // 失敗した支払いの処理（例：ユーザーに通知を送る）
      break;

    // 他のイベントタイプの処理をここに追加できます
  }
  return NextResponse.json({ received: true });
}

async function processUserData(
  supabase: SupabaseClient,
  userId: string,
  setupData: any
) {
  // Fetch existing user data from the database
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) {
    throw new Error(`Failed to fetch user data: ${userError.message}`);
  }

  if (!userData) {
    throw new Error("User not found in the database");
  }

  const userName = userData.name;

  // Update user data
  const { error: updateError } = await supabase
    .from("users")
    .update({
      domain: setupData.siteDomain,
      notion_token: setupData.notionToken,
      notion_id: setupData.notionId,
      template_id: setupData.templateId,
      // user_profile_image_url: userPicture,
    })
    .eq("id", userId);

  if (updateError) {
    throw new Error(`Failed to update user data: ${updateError.message}`);
  }

  // Insert blog metadata
  //TODO:ここのRLSポリシー問題でエラーになっている。セッションがない状態で挿入しようとしているから。
  const { error: insertError } = await supabase.from("blog_meta_data").insert([
    {
      id: userId,
      author: userName,
    },
  ]);

  if (insertError) {
    throw new Error(`Failed to insert blog metadata: ${insertError.message}`);
  }
}
