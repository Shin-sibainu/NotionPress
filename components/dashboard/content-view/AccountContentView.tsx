import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AccountContentView() {
  return (
    <div className="px-4">
      <div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-medium">アカウント設定</h3>
          <button className={cn(buttonVariants({ variant: "destructive" }))}>
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}
