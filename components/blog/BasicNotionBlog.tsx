import { userData } from "@/global";
import { User } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BasicBlogList from "./basic/BasicBlogCardList";
import Link from "next/link";
import { getNotionHomePagePosts } from "@/utils/notion/getNotionData";

interface BasicNotionBlogProps {
  domain: string;
  userData: userData;
}

export default async function BasicNotionBlog({
  domain,
  userData,
}: BasicNotionBlogProps) {
  const user_profile_image_url = userData?.user_profile_image_url!;

  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const notionBlogPostsForHome = await getNotionHomePagePosts(
    notionToken,
    notionId
  );

  return (
    <div className="py-2">
      <div className="mx-auto flex flex-col">
        <Avatar className="mx-auto w-20 h-20">
          <AvatarImage src={user_profile_image_url} alt="profile_icon" />
          <AvatarFallback>{""}</AvatarFallback>
        </Avatar>
        <span className="font-bold md:text-2xl text-2xl">
          {"NotionPress Blog"}
        </span>
        <p className="text-muted-foreground text-sm sm:text-base">
          自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。
        </p>
      </div>

      <div className="py-10">
        <div className="space-y-4">
          <span className="block font-medium text-muted-foreground text-lg">
            最近の投稿
          </span>
          <hr />

          <div>
            <BasicBlogList
              domain={domain}
              notionBlogData={notionBlogPostsForHome}
            />
          </div>
        </div>
      </div>

      <div className="py-3 text-center">
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
