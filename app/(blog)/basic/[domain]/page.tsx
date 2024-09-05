import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";

export default async function BasicBlogHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;
  const userData = await getUserAllData(domain);

  let userIsSelectedThisTemplate = userData?.template_id === 1; //basic

  if (!userData) {
    return <div>データが存在しません。</div>;
  }

  if (!userIsSelectedThisTemplate) {
    return <div>あなたはこのテンプレートをご利用いただけません。</div>;
  }

  return (
    <div>
      <BasicNotionBlog domain={domain} userData={userData} />
    </div>
  );
}
