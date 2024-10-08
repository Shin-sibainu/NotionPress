import { userData } from "@/global";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BasicBlogList from "./basic/BasicBlogCardList";
import Link from "next/link";
import { getNotionHomePagePosts } from "@/utils/notion/getNotionData";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { getUserIdFromDomain } from "@/utils/blog/supabaseDataFetch";

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

export default async function BasicNotionBlog({
  domain,
  userData,
}: BasicNotionBlogProps) {
  const user_profile_image_url = userData?.user_profile_image_url!;

  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const supabase = supabaseServer();

  // 並列でデータを取得
  const [notionBlogPostsForHome, userId] = await Promise.all([
    getNotionHomePagePosts(notionToken, notionId),
    getUserIdFromDomain(supabase, domain),
  ]);

  if (!userId) {
    return <p>User not found</p>;
  }

  const blogDetailSettingData = await getBlogDetailSettingData(
    supabase,
    userId
  );

  if (!blogDetailSettingData) {
    return <p>Blog details not found</p>;
  }

  const { name: blogName, bio } = blogDetailSettingData;

  return (
    <div className="flex flex-col py-2 h-full">
      <div className="flex flex-col">
        <Avatar className="mx-auto w-20 h-20">
          <AvatarImage src={user_profile_image_url} alt="profile_icon" />
          <AvatarFallback>{""}</AvatarFallback>
        </Avatar>
        <div className="md:mt-1 mt-7">
          <span className="font-bold md:text-2xl text-2xl">{blogName}</span>
          <p className="text-muted-foreground text-sm sm:text-base">{bio}</p>
        </div>
      </div>

      <div className="py-7">
        <div className="space-y-4">
          <span className="block font-medium text-muted-foreground text-lg">
            最近の投稿
          </span>
          <hr />

          {notionBlogPostsForHome ? (
            <BasicBlogList
              domain={domain}
              notionBlogData={notionBlogPostsForHome}
            />
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-1">
                何も投稿されていません。
              </h3>
              <Link
                href={`/${domain}/dashboard/how-to-write-blog-with-notion`}
                className="underline-offset-4 underline"
              >
                Notionブログの作り方
              </Link>
              を参考に記事投稿しましょう。
            </div>
          )}
        </div>
      </div>

      <div className="py-12 text-center">
        <Link
          className="text-sky-600 underline underline-offset-4"
          href={`/basic/${domain}/posts/page/1`}
        >
          全ての記事を見る
        </Link>
      </div>
    </div>
  );
}
