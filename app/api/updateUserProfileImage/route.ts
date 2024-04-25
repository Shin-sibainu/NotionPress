import { supabaseRouteHandlerClient } from "@/utils/supabase/auth-helpers/supabaseRouteHandlerClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await updateUserProfileImage();

    return NextResponse.json({ message: "ユーザー画像を更新しました。" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "ユーザー画像更新に失敗しました。",
    });
  }
}

async function updateUserProfileImage() {
  const supabase = supabaseRouteHandlerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  await supabase
    .from("users")
    .update({
      user_profile_image_url: user?.user_metadata.picture,
    })
    .eq("id", user?.id!);
}
