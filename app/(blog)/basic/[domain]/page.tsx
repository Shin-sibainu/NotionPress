import BasicNotionBlog from "@/components/blog/BasicNotionBlog";
import { getUserAllData } from "@/utils/supabase/getUserData";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import Link from "next/link";

//共通 => userData + notionDBからのデータ取得
export default async function BlogHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = params.domain;

  const supabase = supabaseServer();
  const userData = await getUserAllData(domain, supabase);
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!userData) {
    return (
      <div>
        データが存在しません。
        <Link href={`/${domain}/dashboard`}>
          ダッシュボードに戻ってください。
        </Link>
      </div>
    );
  }

  return (
    <div>
      <BasicNotionBlog domain={domain} user={user} userData={userData} />
    </div>
  );
}
