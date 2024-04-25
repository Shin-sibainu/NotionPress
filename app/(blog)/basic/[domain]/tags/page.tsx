import { getAllTagsData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import Link from "next/link";

//https://github.com/Shin-sibainu/notion-blog-udemy/blob/main/lib/notionAPI.ts

export default async function TagsPage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;

  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const allTags = await getAllTagsData(notionToken, notionId);

  return (
    <div className="py-7">
      <div className="space-y-4">
        <span className="font-bold text-xl text-muted-foreground">
          タグ一覧
        </span>

        <hr />
      </div>

      <div className="py-4">
        <div>
          <div className="tag grid sm:grid-cols-2 md:grid-cols-3 gap-y-6">
            {allTags?.map((tag) => (
              <div key={tag}>
                <Link href={`tags/${tag}`}>{tag}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
