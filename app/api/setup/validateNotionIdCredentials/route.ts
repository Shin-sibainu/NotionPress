import { notionInit } from "@/lib/notionAPI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notionToken, notionId } = await req.json();
  const notion = notionInit(notionToken);

  try {
    await notion.databases.query({
      database_id: notionId,
    });

    return NextResponse.json({
      isValid: true,
      message: "Notion IDは有効です。",
    });
  } catch (error) {
    return NextResponse.json({
      isValid: false,
      message: "Notion IDが有効ではありません。再度ご確認ください。",
    });
  }
}
