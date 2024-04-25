import Link from "next/link";

export default async function BasicBlogHeader({ domain }: { domain: string }) {
  return (
    <header className="py-6">
      <div className="flex items-center gap-5">
        <Link href={`/basic/${domain}`} className="font-bold md:text-3xl">
          ShinCode
        </Link>
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <Link
                href={`/basic/${domain}`}
                className={`hover:text-muted-foreground duration-300`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/basic/${domain}/posts/page/1`}
                className={`hover:text-muted-foreground duration-300`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href={`/basic/${domain}/tags`}
                className={`hover:text-muted-foreground duration-300`}
              >
                Tags
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto">Light</div>
      </div>
    </header>
  );
}
