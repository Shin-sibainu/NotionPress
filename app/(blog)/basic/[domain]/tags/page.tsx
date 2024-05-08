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
          <div className="tag grid sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-3">
            {allTags?.map((tag) => (
              <Link
                href={`tags/${tag}/1`}
                key={tag}
                className="relative flex items-center gap-2 border rounded-l-2xl px-3 py-2 bg-orange-100 hover:bg-orange-200 duration-200 hover:border-orange-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m.719 9.391l3.89 3.89a.75.75 0 0 0 1.06 0l7.72-7.72a.36.36 0 0 0 .11-.29l-.59-3.83a.37.37 0 0 0-.35-.35l-3.83-.59a.36.36 0 0 0-.29.11l-7.72 7.72a.75.75 0 0 0 0 1.06" />
                    <path d="M9.889 4.611a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1" />
                  </g>
                </svg>
                <span className="font-medium">{tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
