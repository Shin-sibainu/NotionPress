import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import { getAllPosts, getPostsForHomePage, notionInit } from "@/lib/notionAPI";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const getUserData = async (
  domain: string,
  supabase: SupabaseClient<Database>
) => {
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("domain", domain)
    .single();

  return userData;
};

const getNotionDBData = async (notionToken: string, notionId: string) => {
  const notion = notionInit(notionToken);

  try {
    const allPosts = await getAllPosts(notion, notionId);

    return allPosts;
  } catch (err) {
    console.error(err);
    return null;
  }
};

//共通 => userData + notionDBからのデータ取得
export default async function BlogHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;

  const supabase = supabaseServer();
  const userData = await getUserData(domain, supabase);

  if (!userData) {
    return (
      <div>
        データが存在しません。
        <Link href={`/${domain}/dashboard`}>
          ダッシュボードに戻ってください。
        </Link>
      </div>
    );
  }

  const notionBlogData = await getNotionDBData(
    userData?.notion_token!,
    userData?.notion_id!
  );

  return (
    <div>
      <BasicNotionBlog userData={userData} notionBlogData={notionBlogData} />
    </div>
  );
}
