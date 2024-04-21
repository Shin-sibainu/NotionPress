import Link from "next/link";
import BasicBlogCard from "./BasicBlogCard";
import { NotionPageData } from "@/types";

export default function BasicBlogCardList({
  domain,
  notionBlogData,
}: {
  domain: string;
  notionBlogData: NotionPageData[] | null;
}) {
  return (
    <div>
      <div className="space-y-9">
        {notionBlogData?.map((notionBlog) => (
          <BasicBlogCard
            key={notionBlog.id}
            domain={domain}
            notionBlog={notionBlog}
          />
        ))}
      </div>

      <div className="py-20 text-center">
        <Link
          className="text-sky-600 underline underline-offset-4"
          href={`/basic/${domain}/posts`}
        >
          全ての記事を見る
        </Link>
      </div>
    </div>
  );
}
