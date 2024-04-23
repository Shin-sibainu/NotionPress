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
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <BasicBlogHeader domain={domain} />
        <main>{children}</main>
      </div>
    </div>
  );
}
