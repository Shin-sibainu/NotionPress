import { supabaseRouteHandlerClient } from "@/utils/supabase/auth-helpers/supabaseRouteHandlerClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { setupData } = await req.json();

  const { siteDomain, notionToken, notionId, templateId } = setupData;

  try {
    await saveUserDataToSupabase(siteDomain, notionToken, notionId, templateId);

    return NextResponse.json({ message: "ブログが正常に作成されました。" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "ブログ作成中にエラーが発生しました。",
    });
  }
}

async function saveUserDataToSupabase(
  siteDomain: string,
  notionToken: string,
  notionId: string,
  templateId: number
) {
  const supabase = supabaseRouteHandlerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  await supabase
    .from("users")
    .update({
      domain: siteDomain,
      notion_token: notionToken,
      notion_id: notionId,
      template_id: templateId,
    })
    .eq("id", user?.id!);
}
