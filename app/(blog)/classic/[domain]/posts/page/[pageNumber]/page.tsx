import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ一覧",
};

import ListLayout from "@/components/blog/classic/ListLayout";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import {
  getAllNotionPosts,
  getPostsByPageData,
} from "@/utils/notion/getNotionData";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 5;

export default async function ClassicNotionBlogPostsListByPageNumber({
  params,
}: {
  params: { domain: string; pageNumber: string };
}) {
  const domain = params.domain;
  const pageNumber = parseInt(params.pageNumber);
  const currentPageNumber = pageNumber;

  const userData = await getUserAllData(domain);

  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const allPosts = await getAllNotionPosts(notionToken, notionId);
  if (!allPosts) {
    notFound();
  }
  const initialDisplayPosts = allPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );

  const pagination = {
    currentPage: currentPageNumber,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
    domain: domain,
  };

  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      domain={domain}
      title="All Posts"
    />
  );
}
