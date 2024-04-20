import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <section className="container">
        <div className="mx-auto text-center md:py-48 space-y-4 py-20">
          <h1 className="lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-extrabold tracking-tighter">
            NotionPress🚀
          </h1>
          <div className="text-muted-foreground md:text-xl">
            <p>
              Notionを利用して誰でも簡単にブログ投稿ができるWebサービスです。
            </p>
          </div>
          <div className="space-x-2">
            <Link
              href={"/setup"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              はじめる
            </Link>
            <Link
              href={"/"}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Github
            </Link>
          </div>
        </div>
      </section>

      <section id="#feature" className="container py-32">
        <div className="text-center space-y-6">
          <h1 className="text-center lg:text-5xl md:text-4xl text-3xl font-medium">
            特徴
          </h1>
          <p className="tracking-wide text-muted-foreground">
            Notionを利用しているユーザーであれば、誰でも数分で独自のブログ運用をスタートできます。
          </p>
        </div>
      </section>
    </div>
  );
}
