import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SetupData } from "./setup-step-component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/lib/Icons";

export default function SetupCompleteComponent({
  onBack,
  setupData,
}: {
  onBack: () => void;
  setupData: SetupData;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [blogCreateError, setBlogCreateError] = useState("");

  const handleCreateBlog = async () => {
    setIsLoading(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createNotionBlog`, {
        method: "POST",
        headers: {
          "Content-Types": "application/json",
        },
        body: JSON.stringify({ setupData }),
      });

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateUserProfileImage`,
        {
          method: "POST",
          headers: {
            "Content-Types": "application/json",
          },
        }
      );

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createBlogMetaData`,
        {
          method: "POST",
          headers: {
            "Content-Types": "application/json",
          },
          body: JSON.stringify({ setupData }),
        }
      );

      router.push(`/${setupData.siteDomain}/dashboard/blog`);
    } catch (err) {
      console.log(err);
      setBlogCreateError(
        "ブログの作成に失敗しました。もう一度最初から設定をお願いします。"
      );
      setIsLoading(false);
    }
  };

  if (blogCreateError) {
    return <span>{blogCreateError}</span>;
  }

  return (
    <>
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center space-y-4">
            <span className="font-bold text-xl">ブログの作成中です...</span>
            <Icons.spinner className="animate-spin text-center mx-auto h-20 w-20" />
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
