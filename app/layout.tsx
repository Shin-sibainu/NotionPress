import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Notion", "NotionPress", "Blog"],
  authors: [
    {
      name: "shincode",
      url: siteConfig.links.twitter,
    },
  ],
  creator: "shincode",
  metadataBase:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? new URL("https://notion-press.vercel.app")
      : undefined,
  openGraph: {
    type: "website",
    locale: "ja",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: "/opengraph-image.png",
    creator: "@shincode",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          NotoSansJP.className
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
