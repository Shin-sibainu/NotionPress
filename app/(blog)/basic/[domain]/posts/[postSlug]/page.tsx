import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getNotionDetailPostData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

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

export default async function BasicNotionBlogDetailPage({
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

  const {
    title: detailPostTitle,
    date: detailPostDate,
    tags: detailPostTags,
  } = detailPost?.metadata!;

  return (
    <section className="py-5 mb-5">
      <h2 className="w-full text-3xl font-medium">{detailPostTitle}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-muted-foreground">公開日 {detailPostDate}</span>
      <div className="flex items-center gap-1 py-1">
        {detailPostTags.map((tag: string, index: number) => (
          <Badge
            key={index}
            className={cn(badgeVariants({ variant: "default" }))}
          >
            <Link href={`/basic/${domain}/tags/${tag}/1`}>{tag}</Link>
          </Badge>
        ))}
      </div>

      <div className="flex flex-col">
        <div className="py-4">
          {/* <ReactMarkdown
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
            p: P,
            // a: A,
            // blockquote: BlockQoute,
            ul: Ul,
            li: Li
          }}
        >
          {detailPost?.markdown}
        </ReactMarkdown> */}
          <article className="prose prose-xl prose- prose-a:text-blue-600 hover:prose-a:text-blue-500 text-foreground">
            <ReactMarkdown>{detailPost?.markdown}</ReactMarkdown>
          </article>
        </div>

        <div className="py-10 space-y-1">
          <span className="text-muted-foreground font-bold inline-block">
            本記事のタグ
          </span>
          <hr />
          <div className="flex items-center gap-1 py-1">
            {detailPostTags.map((tag: string, index: number) => (
              <Badge
                key={index}
                className={cn(badgeVariants({ variant: "default" }))}
              >
                <Link href={`/basic/${domain}/tags/${tag}/1`}>{tag}</Link>
              </Badge>
            ))}
          </div>
        </div>

        <div className="py-0 text-center">
          <Link
            className="text-sky-600 underline underline-offset-4"
            href={`/basic/${domain}/posts/page/1`}
          >
            全ての記事を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
