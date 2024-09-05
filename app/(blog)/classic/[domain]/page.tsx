import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import ClassicNotionBlog from "@/components/blog/ClassicNotionBlog";
import { getUserAllData } from "@/utils/supabase/auth-helpers/getUserData";
import { notFound } from "next/navigation";

export default async function ClassicBlogHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;
  const userData = await getUserAllData(domain);

  let userIsSelectedThisTemplate = userData?.template_id === 2; //basic

  if (!userData) {
    return <div>データが存在しません。</div>;
  }

  if (!userIsSelectedThisTemplate) {
    return notFound();
  }

  return (
    <div>
      <ClassicNotionBlog domain={domain} userData={userData} />
    </div>
  );
}
