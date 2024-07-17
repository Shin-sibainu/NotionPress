import { NotionPageData } from "@/types";
import { ReactNode } from "react";

interface LayoutProps {
  content: NotionPageData;
  children: ReactNode;
}
export default function PostSimpleLayout({ content, children }: LayoutProps) {
  const { slug, date, title } = content;
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-x-5xl xl:px-0">
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-7 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{date}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {title}
                </h1>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-7 dark:prose-invert">
                {children}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
