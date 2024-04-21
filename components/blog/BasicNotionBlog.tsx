import { userData } from "@/global";
import { NotionPageData } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";

interface BasicNotionBlogProps {
  user: User | null;
  userData: userData;
  notionBlogData: NotionPageData[] | null;
}

export default function BasicNotionBlog({
  user,
  userData,
  notionBlogData,
}: BasicNotionBlogProps) {
  const userDisplayName = user?.user_metadata.name;

  return (
    <div>
      <div>{userDisplayName ?? "NotionPress Blog"}</div>
    </div>
  );
}
