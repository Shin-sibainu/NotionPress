"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      className={cn(buttonVariants({ variant: "secondary" }))}
      onClick={handleSignOut}
    >
      ログアウト
    </button>
  );
}
