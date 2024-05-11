import BasicBlogFooter from "@/components/blog/basic/BasicBlogFooter";
import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";
import { ThemeProvider } from "@/components/blog/basic/ThemeProvider";

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
