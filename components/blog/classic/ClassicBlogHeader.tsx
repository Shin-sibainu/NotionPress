import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getBlogDetailSettingData,
  getUserIdFromDomain,
  getUserProfileImageUrlFromDomain,
} from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default async function ClassicBlogHeader({
  domain,
}: {
  domain: string;
}) {
  const supabase = supabaseServer();
  const userId = await getUserIdFromDomain(supabase, domain);
  const userProfileImageUrl = await getUserProfileImageUrlFromDomain(
    supabase,
    domain
  );

  const userData = await getBlogDetailSettingData(supabase, userId);
  const { name } = userData;
  const blogHeaderTitle = name ? name : "ClassicBlog";

  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <Link href={`/classic/${domain}`}>
          <div className="flex items-center justify-between">
            <div className="mr-3 mt-2 inline-block">
              <Avatar className="mx-auto w-11 h-11">
                <AvatarImage
                  src={userProfileImageUrl?.user_profile_image_url}
                  alt="profile_icon"
                />
                <AvatarFallback>{""}</AvatarFallback>
              </Avatar>
            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {blogHeaderTitle}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <Link
          href={`/classic/${domain}/posts/page/1`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          Blog
        </Link>
        <Link
          href={`/classic/${domain}/tags`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          Tags
        </Link>
        <Link
          href={`/classic/${domain}/about`}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          About
        </Link>
        {/* <SearchButton /> */}
        <ThemeSwitch />
        {/* <MobileNav /> */}
      </div>
    </header>
  );
}
