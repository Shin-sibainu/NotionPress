import { userData } from "@/global";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BasicBlogList from "./basic/BasicBlogCardList";
import Link from "next/link";
import { getNotionHomePagePosts } from "@/utils/notion/getNotionData";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { getUserIdFromDomain } from "@/utils/blog/supabaseDataFetch";
import { notFound } from "next/navigation";

interface BasicNotionBlogProps {
  domain: string;
  userData: userData;
}

const getBlogDetailSettingData = async (
  supabase: SupabaseClient,
  userId: string | undefined
) => {
  const { data: blogDetailSettingData } = await supabase
    .from("blog_meta_data")
    .select("*")
    .eq("id", userId)
    .single();

  return blogDetailSettingData;
};

export default async function ClassicNotionBlog({
  domain,
  userData,
}: BasicNotionBlogProps) {
  const user_profile_image_url = userData?.user_profile_image_url!;

  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const notionBlogPostsForHome = await getNotionHomePagePosts(
    notionToken,
    notionId
  );

  if (!notionBlogPostsForHome) {
    notFound();
  }

  const supabase = supabaseServer();

  const userId = await getUserIdFromDomain(supabase, domain);
  if (!userId) {
    return <p>User not found</p>;
  }

  const blogDetailSettingData = await getBlogDetailSettingData(
    supabase,
    userId
  );

  if (!blogDetailSettingData) {
    return <p>Blog details not found</p>;
  }

  const { name: blogName, bio } = blogDetailSettingData;

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            最新のブログ記事をNotionから投稿しています。
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!notionBlogPostsForHome.length && "No posts found."}
          {notionBlogPostsForHome.slice(0, 5).map((post) => {
            const { slug, date, title, tags } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{date}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {/* {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))} */}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {/* {summary} */}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          もっと読む &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {notionBlogPostsForHome.length > 5 && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  );
}
