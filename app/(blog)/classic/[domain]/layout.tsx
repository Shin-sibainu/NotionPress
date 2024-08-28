import { ThemeProvider } from "@/components/blog/basic/ThemeProvider";
import ClassicBlogFooter from "@/components/blog/classic/ClassicBlogFooter";
import ClassicBlogHeader from "@/components/blog/classic/ClassicBlogHeader";
import { getBlogMetaDataFromDomain } from "@/utils/blog/easy-data-fetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { Metadata } from "next";

//https://github.com/timlrx/tailwind-nextjs-starter-blog

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata> {
  const supabase = supabaseServer();
  const blogMetaData = await getBlogMetaDataFromDomain(supabase, params.domain);
  // デフォルト値を設定
  const defaultTitle = "Classic Blog";
  const defaultDescription = "This Blog is Classic Template";
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

export default function ClassicNotionBlogLayout({
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
      <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex h-screen flex-col gap-3">
          <ClassicBlogHeader domain={domain} />
          <main className="mb-auto  ">{children}</main>
          <ClassicBlogFooter domain={domain} />
        </div>
      </section>
    </ThemeProvider>
  );
}
