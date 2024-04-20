import { userData } from "@/global";
import { NotionPageData } from "@/types";

interface BasicNotionBlogProps {
  userData: userData;
  notionBlogData: NotionPageData[] | null;
}

export default function BasicNotionBlog({
  userData,
  notionBlogData,
}: BasicNotionBlogProps) {
  return (
    <div>
      <div>BasicNotionBlog</div>
      <p>{userData.domain}のブログです。</p>
    </div>
  );
}
