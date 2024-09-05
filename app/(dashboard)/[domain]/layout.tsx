import Header from "@/components/marketing/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード | NotionPress",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* bg-gradient-to-b from-[#faf9f8] to-[#fffcfa] */
    <div className="">
      <Header />
      <main>{children}</main>
    </div>
  );
}
