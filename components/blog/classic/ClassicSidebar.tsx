import { getAllTagsData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ClassicSidebar({ domain }: { domain: string }) {
  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;
  const allTags = await getAllTagsData(notionToken, notionId);

  if (!allTags) {
    notFound();
  }

  return (
    <div className="bg-slate-50 px-7 py-4 shadow">
      <div>
        <span className="text-pink-500 font-bold text-lg">All Posts</span>
        <div className="ml-2 mt-1 space-y-2">
          {allTags.map((tag: string) => (
            <div key={tag} className="flex flex-col text-base">
              <Link
                href={`/classic/${domain}/tags/${tag}/1`}
                className="hover:text-pink-500"
              >
                {tag}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
