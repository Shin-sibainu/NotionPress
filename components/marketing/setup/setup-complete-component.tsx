import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SetupData } from "./setup-step-component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/lib/Icons";
import { isPaidTemplate } from "@/utils/setup/templateConstants";
import { templateIdToTemplateName } from "@/utils/switch-templateId-to-templateName";

export default function SetupCompleteComponent({
  onBack,
  setupData,
}: {
  onBack: () => void;
  setupData: SetupData;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [blogCreateError, setBlogCreateError] = useState("");

  const { notionToken, notionId, siteDomain, templateId } = setupData;
  let blogTemplateName = templateIdToTemplateName(templateId);

  const handleCreateBlog = async () => {
    if (isPaidTemplate(Number(setupData.templateId))) {
      setIsStripeLoading(true);
      //有料のテンプレートの場合
      try {
        //決済開始
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/create-checkout-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ setupData }),
          }
        );
        const session = await response.json();

        localStorage.setItem("blogCreationSuccess", "true");
        router.push(session.url);
      } catch (error) {
        console.error("Stripe session creation failed", error);
        setBlogCreateError(
          "決済ページの作成に失敗しました。もう一度お試しください。"
        );
        setIsStripeLoading(false);
      }
    } else {
      //無料ブログテンプレート
      setIsLoading(true);

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/createNotionBlog`,
          {
            method: "POST",
            headers: {
              "Content-Types": "application/json",
            },
            body: JSON.stringify({ setupData }),
          }
        );

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

        localStorage.setItem("blogCreationSuccess", "true");
        router.push(`/${setupData.siteDomain}/dashboard/blog`);
      } catch (err) {
        console.log(err);
        setBlogCreateError(
          "ブログの作成に失敗しました。もう一度最初から設定をお願いします。"
        );
        setIsLoading(false);
      }
    }
  };

  if (blogCreateError) {
    return <span>{blogCreateError}</span>;
  }

  if (isStripeLoading) {
    return (
      <span className="font-medium text-xl">決済ページへ移動中です...</span>
    );
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
                <p className="font-bold text-xl">{siteDomain}</p>
                <hr className="mt-2" />
              </div>

              <div>
                <span className="">Notion Integration Token</span>
                <p className="font-bold text-xl">{notionToken}</p>
                <hr className="mt-2" />
              </div>

              <div>
                <span className="">Notion ID</span>
                <p className="font-bold text-xl">{notionId}</p>
                <hr className="mt-2" />
              </div>

              <div>
                <span className="">ブログテンプレート</span>
                <p className="font-bold text-xl">
                  {blogTemplateName + "テーマ"}
                </p>
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
              {isPaidTemplate(Number(setupData.templateId))
                ? "決済へ進む"
                : "ブログ作成を開始🚀"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
