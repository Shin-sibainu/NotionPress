import { Badge, badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { templateIdToTempalteName } from "@/utils/switch-templateId-to-templateName";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";

const getTemplateId = async (supabase: SupabaseClient, domain: string) => {
  const { data: templateId } = await supabase
    .from("users")
    .select("template_id")
    .eq("domain", domain)
    .single();

  return templateId?.template_id;
};

export default async function BlogContentView({ domain }: { domain: string }) {
  const supabase = supabaseServer();
  const templateId = await getTemplateId(supabase, domain);

  const templateName = templateIdToTempalteName(templateId);

  return (
    <div className="px-4">
      <div className="pb-6 space-y-4">
        <span className="font-normal sm:text-xl text-lg">公開中のブログ</span>
        <div className="sm:grid md:grid-cols-2 gap-4 max-w-[50rem]">
          <div className="card rounded-md shadow-md p-4 space-y-2">
            <Image
              src={"/images/blog/blog-post-1.jpg"}
              width={240}
              height={240}
              priority
              alt="blog-post-1"
              className="mx-auto"
            />
            <div>
              <div className="flex justify-between items-center py-2">
                <h3 className="font-bold text-xl">{domain}</h3>
                <Badge className={cn(badgeVariants({ variant: "free" }))}>
                  公開中
                </Badge>
              </div>

              <Link
                href={`/${templateName}/${domain}`}
                className={`inline underline underline-offset-4 text-muted-foreground items-center gap-1 break-words whitespace-normal`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-sm md:text-base">
                  {`${process.env.NEXT_PUBLIC_BASE_URL}/${templateName}/${domain}`}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 ml-1 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="py-4">
        <div className="space-y-2">
          <span className="font-medium sm:text-xl text-lg">
            Notionブログの基本設定
          </span>

          <div>
            <Label className="font-normal">ブログ名</Label>
            <Input placeholder="NotionPressのブログ" className="mt-1" />
          </div>

          <div>
            <Label className="font-normal">自己紹介文</Label>
            <Textarea
              placeholder="こんにちは。ShinCodeです。WebエンジニアとしてNotionでブログ執筆活動をしています。"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="space-y-3">
          <span className="font-medium sm:text-xl text-lg">
            ブログの詳細カスタマイズ
          </span>

          <div>
            <Label className="font-normal">XアカウントID</Label>
            <Input placeholder="Shin_Engineer" className="mt-1" />
          </div>

          <div>
            <Label className="font-normal">あなたのウェブサイト</Label>
            <Input placeholder="https://xxx.com" className="mt-1" />
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="space-y-3">
          <span className="font-medium sm:text-xl text-lg">ブログの収益化</span>

          <div>
            <Label className="font-normal">Googleアドセンスコード ?</Label>
            <Input placeholder="xxxxxxxxxxxx" className="mt-1" />
          </div>
        </div>
      </div>

      <button className={cn(buttonVariants({ variant: "default" }))}>
        保存する
      </button>
    </div>
  );
}
