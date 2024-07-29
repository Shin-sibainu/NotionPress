import Link from "next/link";
import AvatarSetting from "../auth/avatar-setting";
import SignInOnHomePage from "../auth/signin-on-home-page";
import { getDomainAndTemplateIdAndProfileImageUrl } from "@/utils/supabase/auth-helpers/getUserData";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import Image from "next/image";

export default async function Header() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const userData = await getDomainAndTemplateIdAndProfileImageUrl(
    supabase,
    user?.id!
  );

  return (
    <header className="container pt-6">
      <div className="flex items-center justify-between">
        <div className="sm:flex items-center space-x-7 hidden">
          <Link
            href={"/"}
            className="font-bold text-2xl flex items-center gap-2"
          >
            <Image
              src={"/images/notionpress-logo-mod.png"}
              width={30}
              height={30}
              alt="NotionPress_Logo"
              className="mt-1"
            />
            <span>NotionPress</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href={"/blog/how-to-start-with-notion-press"}
              className="hover:text-muted-foreground/70 sm:text-sm pt-1"
            >
              ブログの始め方
            </Link>
            <Link
              href={"/blog/templates"}
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
