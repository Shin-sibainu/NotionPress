import Link from "next/link";

export default function ClassicBlogHeader({ domain }: { domain: string }) {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/">
          <div className="flex items-center justify-between">
            <div className="mr-3">{/* <Logo /> */}</div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              ClassicBlog
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <Link
          href={`/classic/${domain}`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          Blog
        </Link>
        <Link
          href={`/classic/${domain}`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          Tags
        </Link>
        <Link
          href={`/classic/${domain}`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          Projects
        </Link>
        <Link
          href={`/classic/${domain}`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          About
        </Link>
        {/* <SearchButton /> */}
        {/* <ThemeSwitch /> */}
        {/* <MobileNav /> */}
      </div>
    </header>
  );
}
