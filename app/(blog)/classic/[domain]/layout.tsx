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

  const { name, bio, author } = blogMetaData!;

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
