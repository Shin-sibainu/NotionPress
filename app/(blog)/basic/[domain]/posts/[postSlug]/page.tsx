import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getNotionDetailPostData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import Link from "next/link";
import { ClassAttributes, HTMLAttributes } from "react";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// https://github.com/Shin-sibainu/notion-blog-udemy/blob/main/lib/notionAPI.ts
// https://www.newt.so/docs/tutorials/generate-anchor-links-using-react-markdown

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

  const H2 = ({
    node,
    children,
  }: ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => {
    const title =
      node?.children[0] && "value" in node?.children[0]
        ? node?.children[0].value
        : "";
    return <h2 className="font-bold text-2xl">{children}</h2>;
  };

  return (
    <section className="py-5">
      <h2 className="w-full text-3xl font-medium">{detailPostTitle}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-muted-foreground">公開日 {detailPostDate}</span>
      <div className="flex items-center gap-1 py-1">
        {detailPostTags.map((tag: string, index: number) => (
          <Badge
            key={index}
            className={cn(badgeVariants({ variant: "default" }))}
          >
            <Link href={`/basic/${domain}/tags/${tag}`}>{tag}</Link>
          </Badge>
        ))}
      </div>
      <div className="py-4">
        {/* <ReactMarkdown components={{ h2: H2 }}>
          {detailPost?.markdown}
        </ReactMarkdown> */}
        {detailPost?.markdown}
      </div>
    </section>
  );
}
