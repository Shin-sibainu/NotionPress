import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import ClassicNotionBlog from "@/components/blog/ClassicNotionBlog";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

export default async function ClassicBlogHomePage({
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
      <ClassicNotionBlog domain={domain} userData={userData} />
    </div>
  );
}
