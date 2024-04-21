import { NotionPageData } from "@/types";
import Link from "next/link";

//https://astro-yi-nu.vercel.app/

export default function BasicBlogCard({
  domain,
  notionBlog,
}: {
  domain: string;
  notionBlog: NotionPageData | null;
}) {
  return (
    <div>
      <div className="space-y-1">
        <Link
          href={`/basic/${domain}/posts/blog_slug`}
          className="font-bold text-2xl hover:underline underline-offset-4"
        >
          {notionBlog?.title}
        </Link>
        <p className="text-muted-foreground">{notionBlog?.date}</p>
        <Link
          href={`/basic/${domain}/posts/blog_slug`}
          className="text-sky-600 mt-1 inline-block hover:underline underline-offset-4"
        >
          ブログを読む⇒
        </Link>
      </div>
    </div>
  );
}
