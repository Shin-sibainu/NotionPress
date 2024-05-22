import { getDetailPost } from "@/lib/notionAPI";
import { NotionPageData } from "@/types";
import { getPostDescription } from "@/utils/blog/blog-helper";
import { getNotionDetailPostData } from "@/utils/notion/getNotionData";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import Link from "next/link";

export default async function ClassicBlogPost({
  post,
  domain,
}: {
  post: NotionPageData;
  domain: string;
}) {
  const userData = await getUserAllData(domain);
  const notionToken = userData?.notion_token!;
  const notionId = userData?.notion_id!;

  const detailPost = await getNotionDetailPostData(
    notionToken,
    notionId,
    post.slug
  );

  const postDescription = await getPostDescription(detailPost?.markdown!);

  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>{post.date}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold leading-8 tracking-tight">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {/* Optional: Render tags here */}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400 text-lg">
                {postDescription}
              </div>
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${post.slug}`}
                className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
                aria-label={`Read more: "${post.title}"`}
              >
                もっと読む &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
