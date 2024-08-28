import BasicBlogFooter from "@/components/blog/basic/BasicBlogFooter";
import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";
import { ThemeProvider } from "@/components/blog/basic/ThemeProvider";
import { getBlogMetaDataFromDomain } from "@/utils/blog/easy-data-fetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata> {
  const supabase = supabaseServer();
  const blogMetaData = await getBlogMetaDataFromDomain(supabase, params.domain);
  // デフォルト値を設定
  const defaultTitle = "Basic Blog";
  const defaultDescription = "This Blog is Basic Template";
  const defaultAuthor = "John Doe";

  // 空文字列もデフォルト値を使用するように修正
  const getValueOrDefault = (
    value: string | null | undefined,
    defaultValue: string
  ) => (value && value.trim() !== "" ? value : defaultValue);

  const title = getValueOrDefault(blogMetaData?.name, defaultTitle);
  const description = getValueOrDefault(blogMetaData?.bio, defaultDescription);
  const author = getValueOrDefault(blogMetaData?.author, defaultAuthor);

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    authors: { name: author },
    openGraph: {
      type: "website",
      locale: "ja",
      title: title,
      description: description,
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
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
