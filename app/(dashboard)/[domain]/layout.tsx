import Header from "@/components/marketing/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード",
};

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
