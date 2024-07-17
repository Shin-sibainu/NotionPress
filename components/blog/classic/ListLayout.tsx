import Tag from "./Tag";
import { NotionPageData } from "@/types";
import CustomLink from "./Link";
import ClassicSidebar from "./ClassicSidebar";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  domain: string;
  tag?: string;
}

interface ListLayoutProps {
  posts: NotionPageData[];
  title?: string;
  initialDisplayPosts?: NotionPageData[];
  pagination?: PaginationProps;
  domain: string;
  tag?: string;
}

function Pagination({ totalPages, currentPage, domain, tag }: PaginationProps) {
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  let prevPageNumber = currentPage - 1;
  let nextPageNumber = currentPage + 1;

  return (
    <div className="space-y-2 pt-12 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={`${prevPageNumber}`} rel="prev">
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`${nextPageNumber}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  domain,
  tag,
}: ListLayoutProps) {
  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <>
      <div className="md:flex gap-16 pt-4">
        <div className="md:w-3/12 md:block hidden">
          <ClassicSidebar domain={domain} />
        </div>
        <div className="md:w-9/12">
          <ul className="flex flex-col gap-9">
            {!posts.length && "No posts found."}
            {displayPosts.map((post) => {
              const { id, date, title, tags, slug } = post;
              return (
                <li key={id} className="">
                  <article className="">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{date}</time>
                      </dd>
                    </dl>
                    <div className="">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/classic/${domain}/posts/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap">
                          {tags?.map((tag: string) => (
                            <Tag key={tag} tag={tag} domain={domain} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              domain={domain}
              tag={tag}
            />
          )}
        </div>
      </div>
    </>
  );
}
