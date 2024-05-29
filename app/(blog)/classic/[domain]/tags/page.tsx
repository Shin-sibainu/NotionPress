import Tag from "@/components/blog/classic/Tag";
import { getAllTagsData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

//https://github.com/Shin-sibainu/notion-blog-udemy/blob/main/lib/notionAPI.ts

export const metadata: Metadata = {
  title: "タグ一覧",
};

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

  if (!allTags) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {allTags.length === 0 && "No tags found."}
          {allTags.map((tag: string) => {
            return (
              <div key={tag} className="mb-2 mr-5 mt-2">
                <Tag tag={tag} domain={domain} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
