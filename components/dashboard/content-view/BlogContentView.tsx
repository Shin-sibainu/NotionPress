import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabaseServer } from "@/utils/supabase/supabaseServer";
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
      <div className="space-y-1">
        <div className={`rounded-md shadow-md p-4 space-y-2 max-w-[24rem]`}>
          <Image
            src={"/images/blog/blog-post-1.jpg"}
            width={340}
            height={340}
            priority
            alt="blog-post-1"
            className="mx-auto"
          />
          <div>
            <div className="flex justify-between items-center py-2">
              <h3 className="font-bold text-xl">{domain}</h3>
              <Badge className={cn(badgeVariants({ variant: "free" }))}>
                無料
              </Badge>
            </div>
            <Link
              href={`/${templateName}/${domain}`}
              className={`underline underline-offset-4 text-muted-foreground flex items-center gap-1`}
              target="_blank"
              rel="noreferrer"
            >
              {`${process.env.NEXT_PUBLIC_BASE_URL}/${templateName}/${domain}`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </div>
        </div>
        <h3 className="font-bold text-xl"></h3>
      </div>
    </div>
  );
}
