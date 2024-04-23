import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

//共通 => userData + notionDBからのデータ取得
export default async function BlogHomePage({
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
