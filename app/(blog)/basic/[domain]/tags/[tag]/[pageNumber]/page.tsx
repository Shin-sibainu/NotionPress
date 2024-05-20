import BasicBlogCardList from "@/components/blog/basic/BasicBlogCardList";
import { PaginationComponent } from "@/components/pagination";
import {
  getNumberOfPagesByTagData,
  getPostsByTagAndPageData,
} from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { tag: string; domain: string };
}): Promise<Metadata> {
  const tag = params.tag;

  return {
    title: `${tag}タグ一覧`,
  };
}

export default async function TagToBlogListPage({
  params,
}: {
  params: { tag: string; domain: string; pageNumber: number };
}) {
  const domain = params.domain;
  const tag = params.tag;
  const currentPageNumber = Number(params.pageNumber);

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const postsByTagAndPage = await getPostsByTagAndPageData(
    notionToken,
    notionId,
    currentPageNumber,
    tag
  );

  const numberOfPages = (await getNumberOfPagesByTagData(
    notionToken,
    notionId,
    tag
  )) as number;

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

      <div className="py-12">
        <PaginationComponent
          numberOfPages={numberOfPages}
          tag={tag}
          currentPageNumber={currentPageNumber}
        />
      </div>
    </div>
  );
}
