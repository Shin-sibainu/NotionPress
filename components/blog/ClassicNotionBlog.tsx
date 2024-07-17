import { userData } from "@/global";
import { getNotionHomePagePosts } from "@/utils/notion/getNotionData";
import { SupabaseClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import ClassicBlogList from "./classic/ClassicBlogPostList";
import Link from "next/link";

interface BasicNotionBlogProps {
  domain: string;
  userData: userData;
}

const getBlogDetailSettingData = async (
  supabase: SupabaseClient,
  userId: string | undefined
) => {
  const { data: blogDetailSettingData } = await supabase
    .from("blog_meta_data")
    .select("*")
    .eq("id", userId)
    .single();

  return blogDetailSettingData;
};

export default async function ClassicNotionBlog({
  domain,
  userData,
}: BasicNotionBlogProps) {
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const notionBlogPostsForHome = await getNotionHomePagePosts(
    notionToken,
    notionId
  );
  if (!notionBlogPostsForHome) {
    notFound();
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-3 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            最新のブログ記事をNotionから投稿しています。
          </p>
        </div>
        <ClassicBlogList posts={notionBlogPostsForHome} domain={domain} />
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href={`${domain}/posts/page/1`}
            className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 pt-4"
            aria-label="All posts"
          >
            全ての記事を見る →
          </Link>
        </div>
      </div>
    </>
  );
}
