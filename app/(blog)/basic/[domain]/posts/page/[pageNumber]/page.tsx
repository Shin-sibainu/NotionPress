import BasicBlogCardList from "@/components/blog/basic/BasicBlogCardList";
import { PaginationComponent } from "@/components/pagination";
import {
  getNumberOfPagesData,
  getPostsByPageData,
} from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

export default async function BasicNotionBlogPostsListByPageNumber({
  params,
}: {
  params: { domain: string; pageNumber: number };
}) {
  const domain = params.domain;
  const currentPageNumber = Number(params.pageNumber);

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const getPostsByPage = await getPostsByPageData(
    notionToken,
    notionId,
    currentPageNumber
  );

  const numberOfPages = (await getNumberOfPagesData(
    notionToken,
    notionId
  )) as number;

  return (
    <div className="py-7">
      <div className="space-y-4">
        <span className="font-bold text-xl text-muted-foreground">
          ブログ一覧
        </span>

        <hr />
      </div>

      {getPostsByPage?.length ? (
        <div className="py-4">
          <BasicBlogCardList domain={domain} notionBlogData={getPostsByPage} />
        </div>
      ) : (
        <div className="py-4">
          <span className="text-muted-foreground">投稿がありません。</span>
        </div>
      )}

      <div className="py-8">
        <PaginationComponent
          numberOfPages={numberOfPages}
          tag={""}
          currentPageNumber={currentPageNumber}
        />
      </div>
    </div>
  );
}
