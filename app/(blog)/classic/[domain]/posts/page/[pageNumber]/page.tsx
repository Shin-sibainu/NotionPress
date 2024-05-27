import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ一覧",
};

import ListLayout from "@/components/blog/classic/ListLayout";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import { getPostsByPageData } from "@/utils/notion/getNotionData";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 5;

export default async function ClassicNotionBlogPostsListByPageNumber({
  params,
}: {
  params: { domain: string; pageNumber: string };
}) {
  const domain = params.domain;
  const pageNumber = params.pageNumber;
  const currentPageNumber = Number(pageNumber);

  const userData = await getUserAllData(domain);

  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const getPostsByPage = await getPostsByPageData(
    notionToken,
    notionId,
    currentPageNumber
  );

  if (!getPostsByPage) {
    notFound();
  }

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(getPostsByPage.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayout
      posts={getPostsByPage}
      initialDisplayPosts={getPostsByPage}
      pagination={pagination}
      domain={domain}
      title="All Posts"
    />
  );
}
