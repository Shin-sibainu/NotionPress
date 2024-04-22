import { getUserDomainAndTemplateIdData } from "@/utils/supabase/getUserData";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import Link from "next/link";

export default async function BasicBlogHeader() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const userData = await getUserDomainAndTemplateIdData(supabase, user?.id!);
  const domain = userData?.domain;

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
                href={`/basic/${domain}/posts`}
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
