import AuthorLayout from "@/components/blog/classic/AuthorLayout";
import { getBlogMetaDataFromDomain } from "@/utils/blog/easy-data-fetch";
import { getUserProfileImageUrlFromDomain } from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";

//https://tailwind-nextjs-starter-blog.vercel.app/about
//https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/app/about/page.tsx

export default async function AboutPage({
  params,
}: {
  params: { domain: string };
}) {
  const supabase = supabaseServer();
  const blogMetaData = await getBlogMetaDataFromDomain(supabase, params.domain);
  const profileImageUrl = await getUserProfileImageUrlFromDomain(
    supabase,
    params.domain
  );

  const { bio } = blogMetaData!;
  const safeBio =
    bio ||
    "自己紹介の記入がまだありません。管理者ページで自己紹介文を更新してください。";

  return (
    <>
      <AuthorLayout
        blogMetaData={blogMetaData}
        profileImageUrl={profileImageUrl?.user_profile_image_url}
      >
        {safeBio}
      </AuthorLayout>
    </>
  );
}
