import Footer from "@/components/marketing/footer";
import Header from "@/components/marketing/header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#faf9f8] to-[#fffcfa]">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
