import { supabaseRouteHandlerClient } from "@/utils/supabase/auth-helpers/supabaseRouteHandlerClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await saveBlogMetaDataToSupabase();

    return NextResponse.json({ message: "ブログが正常に作成されました。" });
  } catch (error) {
    console.error("メインのエラーハンドラ:", error);
    return NextResponse.json({
      message: "ブログ作成中にエラーが発生しました。",
    });
  }
}

async function saveBlogMetaDataToSupabase() {
  const supabase = supabaseRouteHandlerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("ユーザー情報を取得できませんでした。");
  }

  const { data: insertedData, error: insertError } = await supabase
    .from("blog_meta_data")
    .insert([{ author: data.user.user_metadata.name }]);

  if (insertError) {
    throw new Error("ブログメタデータの挿入中にエラーが発生しました。");
  }
}
