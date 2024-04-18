import { notionInit } from "@/lib/notionAPI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await req.json();
  const notion = notionInit(token.integrationToken);

  try {
    await notion.users.me({});

    return NextResponse.json({
      isValid: true,
      message: "Notion Integration Tokenは有効です。",
      token,
    });
  } catch (error) {
    return NextResponse.json({
      isValid: false,
      message:
        "Notion Integration Tokenが有効ではありません。再度ご確認ください。",
    });
  }
}
