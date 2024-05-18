import BasicBlogFooter from "@/components/blog/basic/BasicBlogFooter";
import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";
import { ThemeProvider } from "@/components/blog/basic/ThemeProvider";
import { getBlogDetailSettingData } from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    domain: string;
  };
}

// export async function generateMetadata({
//   params,
// }: PostPageProps): Promise<Metadata> {
//   const supabase = supabaseServer();
//   const { data } = await supabase.auth.getUser();
//   const userId = data.user?.id!;

//   const blogMetaData = await getBlogDetailSettingData(supabase, userId);
//   const { id, name, author } = blogMetaData;

//   if (!blogMetaData) {
//     return {};
//   }

//   // const url = env.NEXT_PUBLIC_APP_URL;

//   // const ogUrl = new URL(`${url}/api/og`);
//   // ogUrl.searchParams.set("heading", post.title);
//   // ogUrl.searchParams.set("type", "Blog Post");
//   // ogUrl.searchParams.set("mode", "dark");

//   return {
//     title: name,
//     // description: post.description,
//     // authors: post.authors.map((author) => ({
//     //   name: author,
//     // })),
//     openGraph: {
//       // title: post.title,
//       // description: post.description,
//       type: "article",
//       // url: absoluteUrl(post.slug),
//       // images: [
//       //   {
//       //     url: ogUrl.toString(),
//       //     width: 1200,
//       //     height: 630,
//       //     // alt: post.title,
//       //   },
//       // ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       // title: post.title,
//       // description: post.description,
//       // images: [ogUrl.toString()],
//     },
//   };
// }

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
