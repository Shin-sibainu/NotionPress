"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AccountContentView() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  return (
    <div className="px-4">
      <div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-medium">アカウント設定</h3>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.refresh();
            }}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}
