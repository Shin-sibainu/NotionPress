import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

export default async function BasicBlogHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;
  const userData = await getUserAllData(domain);

  if (!userData) {
    return <div>データが存在しません。</div>;
  }

  return (
    <div>
      <BasicNotionBlog domain={domain} userData={userData} />
    </div>
  );
}
