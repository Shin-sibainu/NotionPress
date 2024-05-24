import { SupabaseClient } from "@supabase/supabase-js";
import {
  getBlogDetailSettingData,
  getUserIdFromDomain,
} from "./supabaseDataFetch";

interface BlogMetaData {
  name: string;
  author: string;
  bio: string;
  x_id: string;
  website: string;
}

// ドメインからブログのメタデータを取得する関数
export async function getBlogMetaDataFromDomain(
  supabase: SupabaseClient,
  domain: string
): Promise<BlogMetaData | null> {
  try {
    // ユーザーIDをドメインから取得
    const userId = await getUserIdFromDomain(supabase, domain);
    if (!userId) {
      throw new Error("User ID not found");
    }

    // ブログの詳細設定データを取得
    const blogMetaData = await getBlogDetailSettingData(supabase, userId);
    if (!blogMetaData) {
      throw new Error("Blog metadata not found");
    }

    const { name, author, bio, x_id, website } = blogMetaData;

    return { name, author, bio, x_id, website };
  } catch (error) {
    console.error("Failed to get blog metadata:", error);
    return null;
  }
}
