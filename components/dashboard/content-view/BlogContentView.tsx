import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { templateIdToTemplateName } from "@/utils/switch-templateId-to-templateName";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";

import BlogContentDetailSettings from "./BlogContentDetailSettings";
import { redirect } from "next/navigation";

const getTemplateId = async (supabase: SupabaseClient, domain: string) => {
  const { data: templateId } = await supabase
    .from("users")
    .select("template_id")
    .eq("domain", domain)
    .single();

  return templateId?.template_id;
};

const getBlogDetailSettingData = async (
  supabase: SupabaseClient,
  userId: string | undefined
) => {
  const { data: blogDetailSettingData } = await supabase
    .from("blog_meta_data")
    .select("*")
    .eq("id", userId)
    .single();

  return blogDetailSettingData;
};

export default async function BlogContentView({ domain }: { domain: string }) {
  const supabase = supabaseServer();

  const { data: user } = await supabase.auth.getUser();
  const userId = user.user?.id;

  if (!userId) {
    redirect("/");
  }

  const templateId = await getTemplateId(supabase, domain);
  const templateName = templateIdToTemplateName(templateId);

  const blogDetailSettingData = await getBlogDetailSettingData(
    supabase,
    userId
  );

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

      <BlogContentDetailSettings
        userId={userId}
        blogDetailSettingData={blogDetailSettingData}
      />
    </div>
  );
}
