import BasicBlogCardList from "@/components/blog/basic/BasicBlogCardList";
import ListLayout from "@/components/blog/classic/ListLayout";
import { PaginationComponent } from "@/components/pagination";
import {
  getAllTagsData,
  getNumberOfPagesByTagData,
  getPostsByTagAndPageData,
  getPostsByTagNameData,
} from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

const POSTS_PER_PAGE = 5;

export default async function TagToBlogListPage({
  params,
}: {
  params: { tag: string; domain: string; pageNumber: string };
}) {
  const domain = params.domain;
  const tag = params.tag;
  const pageNumber = parseInt(params.pageNumber);
  const currentPageNumber = pageNumber;

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const allTagPosts = await getPostsByTagNameData(notionToken, notionId, tag);

  if (!allTagPosts) {
    notFound();
  }

  const initialDisplayPosts = allTagPosts.slice(
    POSTS_PER_PAGE * (currentPageNumber - 1),
    POSTS_PER_PAGE * currentPageNumber
  );

  const pagination = {
    currentPage: currentPageNumber,
    totalPages: Math.ceil(allTagPosts.length / POSTS_PER_PAGE),
    domain: domain,
  };

  return (
    <ListLayout
      posts={allTagPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      domain={domain}
      title={`All ${tag}`}
      tag={tag}
    />
  );
}
