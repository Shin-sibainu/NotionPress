import { Icons } from "@/lib/Icons";
import getUserAllData, {
  getBlogDetailSettingData,
  getUserIdFromDomain,
} from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import Link from "next/link";
import SocialIcon from "./SocialIcon";

export default async function ClassicBlogFooter({
  domain,
}: {
  domain: string;
}) {
  const supabase = supabaseServer();
  const userId = await getUserIdFromDomain(supabase, domain);

  const blogMetaData = await getBlogDetailSettingData(supabase, userId);
  const { name, author, x_id, website } = blogMetaData;
  const safeX_id = x_id || "/";
  const safeWebsite = website || "/";

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="mb-3 flex space-x-4">
        <SocialIcon href={safeX_id} type="twitter" />
        <SocialIcon href={safeWebsite} type="link" />
      </div>
      <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{author ? author : "ClassicBlog"}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link href="/">{name}</Link>
      </div>
      <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/"
          className="underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          Powered By NotionPress
        </Link>
      </div>
    </div>
  );
}
