import BasicBlogCardList from "@/components/blog/basic/BasicBlogCardList";
import { getAllNotionPosts } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

export default async function BasicNotionBlogPostsList({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;

  const userData = await getUserAllData(domain);

  const notionBlogData = await getAllNotionPosts(
    userData?.notion_token!,
    userData?.notion_id!
  );

  return (
    <div className="py-7">
      <div className="space-y-4">
        <span className="font-bold text-xl text-muted-foreground">
          ブログ一覧
        </span>

        <hr />
      </div>

      <div className="py-4">
        <BasicBlogCardList domain={domain} notionBlogData={notionBlogData} />
      </div>
    </div>
  );
}
