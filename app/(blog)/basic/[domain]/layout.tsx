import BasicBlogFooter from "@/components/blog/basic/BasicBlogFooter";
import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";
import { ThemeProvider } from "@/components/blog/basic/ThemeProvider";
import { getBlogDetailSettingData } from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { Metadata } from "next";

export async function generateMetadata({}): Promise<Metadata> {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  const blogMetaData = await getBlogDetailSettingData(supabase, userId!);
  const { name, bio, author } = blogMetaData;

  return {
    title: {
      default: name,
      template: name ? `%s | ${name}` : "ブログ",
    },
    description: bio,
    authors: { name: author },
    openGraph: {
      type: "website",
      locale: "ja",
      // url: siteConfig.url,
      title: name,
      description: bio,
      siteName: name,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: bio,
      // images: [`${siteConfig.url}/og.jpg`],
      creator: author,
    },
  };
}

export default function BasicNotionBlogLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { domain: string };
}>) {
  const domain = params.domain;
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-background h-[61rem] flex flex-col max-w-2xl mx-auto">
        <div className="px-4 flex-grow">
          <BasicBlogHeader domain={domain} />
          <main>{children}</main>
        </div>
        <BasicBlogFooter domain={domain} />
      </div>
    </ThemeProvider>
  );
}
