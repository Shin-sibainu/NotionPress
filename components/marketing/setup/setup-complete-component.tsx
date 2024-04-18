import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SetupData } from "./setup-step-component";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetupCompleteComponent({
  onBack,
  setupData,
}: {
  onBack: () => void;
  setupData: SetupData;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBlog = async () => {
    setIsLoading(true);

    //ブログの作成＆SupabaseDBへの保存

    setIsLoading(false);
    router.push(`/${setupData.siteDomain}/dashboard`);
  };

  return (
    <>
      <h3 className="font-medium text-3xl">入力情報の確認</h3>
      <p className="text-muted-foreground">
        下記の情報でブログ作成を開始します。よろしいでしょうか？
      </p>

      <div>
        <div className="space-y-6">
          <div>
            <span className="">ブログURL</span>
            <p className="font-bold text-xl">{setupData.siteDomain}</p>
            <hr className="mt-2" />
          </div>

          <div>
            <span className="">Notion Integration Token</span>
            <p className="font-bold text-xl">{setupData.notionToken}</p>
            <hr className="mt-2" />
          </div>

          <div>
            <span className="">Notion ID</span>
            <p className="font-bold text-xl">{setupData.notionId}</p>
            <hr className="mt-2" />
          </div>

          <div>
            <span className="">ブログテンプレート</span>
            <p className="font-bold text-xl">{setupData.templateId}</p>
            <hr className="mt-2" />
          </div>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => onBack()}
        >
          戻る
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={handleCreateBlog}
        >
          ブログ作成を開始🚀
        </button>
      </div>
    </>
  );
}
