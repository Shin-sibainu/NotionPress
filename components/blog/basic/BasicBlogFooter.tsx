import { Icons } from "@/lib/Icons";
import {
  getBlogDetailSettingData,
  getUserIdFromDomain,
} from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import Link from "next/link";

const BasicBlogFooter = async ({ domain }: { domain: string }) => {
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

  const { author, x_id, website } = await blogDetailSettingData;

  return (
    <footer className="w-full">
      <div className="pt-2 max-w-2xl mx-auto px-4 flex items-center justify-between">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Link href={x_id} target="_blank" rel="noreferrer">
              <Icons.twitter />
            </Link>
          </li>
          <li>
            <Link href={website} target="_blank" rel="noreferrer">
              <Icons.link />
            </Link>
          </li>
        </ul>
        <div>
          <p className="text-sm text-muted-foreground">Authored By {author}</p>
        </div>
      </div>
    </footer>
  );
};

export default BasicBlogFooter;
