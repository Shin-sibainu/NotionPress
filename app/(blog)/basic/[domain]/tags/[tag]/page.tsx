import BasicBlogCardList from "@/components/blog/basic/BasicBlogCardList";
import { getPostsByTagAndPageData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

export default async function TagToBlogListPage({
  params,
}: {
  params: { tag: string; domain: string };
}) {
  const domain = params.domain;
  const tag = params.tag;

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const postsByTagAndPage = await getPostsByTagAndPageData(
    notionToken,
    notionId,
    1,
    tag
  );

  return (
    <div className="py-7">
      <div className="space-y-4">
        <span className="font-bold text-xl text-muted-foreground">
          {tag}タグの記事一覧
        </span>

        <hr />
      </div>

      <div className="py-4">
        <BasicBlogCardList domain={domain} notionBlogData={postsByTagAndPage} />
      </div>
    </div>
  );
}
