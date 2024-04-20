"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignInOnHomePage() {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/home/callback`,
      },
    });

    if (error) {
      return <div>エラーが発生しました。最初からやり直してください。</div>;
    }
  };

  return (
    <button
      className={cn(buttonVariants({ variant: "outline" }))}
      onClick={handleSignIn}
    >
      アカウント登録
    </button>
  );
}
