import Link from "next/link";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
import AvatarSetting from "../auth/avatar-setting";
import SignInOnHomePage from "../auth/signin-on-home-page";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

const getUserData = async (supabase: SupabaseClient, id: string) => {
  const { data: userData } = await supabase
    .from("users")
    .select("domain, template_id")
    .eq("id", id)
    .single();

  return userData;
};

export default async function Header() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const userData = await getUserData(supabase, user?.id!);

  return (
    <header className="container pt-6">
      <div className="flex items-center justify-between">
        <div className="sm:flex items-center space-x-7 hidden">
          <Link href={"/"} className="font-bold text-2xl">
            NotionPress
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href={"#feature"}
              className="hover:text-muted-foreground/70 sm:text-sm leading-normal pt-1"
            >
              特徴
            </Link>
            <Link
              href={"/template"}
              className="hover:text-muted-foreground/70 sm:text-sm pt-1"
            >
              テンプレート
            </Link>
          </nav>
        </div>
        <nav>
          {user ? (
            <AvatarSetting user={user} userData={userData} />
          ) : (
            <>
              <SignInOnHomePage />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
