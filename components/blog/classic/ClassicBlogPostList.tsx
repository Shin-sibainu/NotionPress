import { NotionPageData } from "@/types";
import { notFound } from "next/navigation";
import ClassicBlogPost from "./ClassicBlogPost";

export default function ClassicBlogList({
  posts,
  domain,
}: {
  posts: NotionPageData[];
  domain: string;
}) {
  if (!posts.length) {
    return notFound();
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {posts.slice(0, 5).map((post) => (
        <ClassicBlogPost key={post.slug} post={post} domain={domain} />
      ))}
    </ul>
  );
}
