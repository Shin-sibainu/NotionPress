import PostSimpleLayout from "@/components/blog/classic/PostSimpleLayout";
import { getNotionDetailPostData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; postSlug: string };
}): Promise<Metadata> {
  const domain = params.domain;
  const postSlug = params.postSlug;

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const detailPost = await getNotionDetailPostData(
    notionToken,
    notionId,
    postSlug
  );

  const {
    title: detailPostTitle,
    date: detailPostDate,
    tags: detailPostTags,
  } = detailPost?.metadata!;

  return {
    title: detailPostTitle,
    description: detailPostTitle,
    openGraph: {
      type: "website",
      locale: "ja",
      // url: siteConfig.url,
      title: detailPostTitle,
      description: detailPostTitle,
    },
    twitter: {
      card: "summary_large_image",
      title: detailPostTitle,
      description: detailPostTitle,
      // images: [`${siteConfig.url}/og.jpg`],
    },
  };
}

export default async function ClassicNotionBlogDetailPage({
  params,
}: {
  params: { domain: string; postSlug: string };
}) {
  const domain = params.domain;
  const postSlug = params.postSlug;

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const detailPost = await getNotionDetailPostData(
    notionToken,
    notionId,
    postSlug
  );

  if (!detailPost) {
    notFound();
  }

  return (
    <section>
      <PostSimpleLayout content={detailPost?.metadata!}>
        <ReactMarkdown>{detailPost?.markdown}</ReactMarkdown>
      </PostSimpleLayout>
    </section>
  );
}
