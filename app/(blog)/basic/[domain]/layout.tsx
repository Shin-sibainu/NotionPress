import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";

export default function BasicNotionBlogLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { domain: string };
}>) {
  const domain = params.domain;
  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto px-4 min-h-screen flex flex-col">
        <BasicBlogHeader domain={domain} />
        <main>{children}</main>
      </div>
    </div>
  );
}
