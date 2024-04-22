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
      <div className="space-y-10">
        {notionBlogData?.map((notionBlog) => (
          <BasicBlogCard
            key={notionBlog.id}
            domain={domain}
            notionBlog={notionBlog}
          />
        ))}
      </div>
    </div>
  );
}
