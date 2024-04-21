import BasicBlogHeader from "@/components/blog/basic/BasicBlogHeader";

export default function BasicNotionBlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <BasicBlogHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}
