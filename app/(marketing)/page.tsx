import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/lib/Icons";
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
              サンプル
            </Link>
          </div>
        </div>
      </section>

      <section id="#feature" className="container py-24">
        <div>
          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-5xl font-bold text-gray-800 md:mb-6">
                  特徴
                </h2>

                <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                  NotionPressでは、Notionユーザーであれば誰でも簡単にブログを作成して運用することを可能にします。
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
                <div className="flex divide-x rounded-lg border bg-gray-50">
                  <div className="flex items-center p-2 text-indigo-500 md:p-4">
                    <Icons.article />
                  </div>

                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      Notionでブログ作成
                    </h3>
                    <p className="text-gray-500">
                      Notionユーザーであれば、たったの数秒でブログ開発をスタートできます。難しいプログラミングは必要ありません。
                    </p>
                  </div>
                </div>
                <div className="flex divide-x rounded-lg border bg-gray-50">
                  <div className="flex items-center p-2 text-indigo-500 md:p-4">
                    <Icons.check />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      無料でスタート
                    </h3>
                    <p className="text-gray-500">
                      ベーシックテンプレートは無料で利用できます。さらに優れたデザインは有料でご利用可能です。後からも変更可能。
                    </p>
                  </div>
                </div>

                <div className="flex divide-x rounded-lg border bg-gray-50">
                  <div className="flex items-center p-2 text-indigo-500 md:p-4">
                    <Icons.media />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      テンプレート利用
                    </h3>
                    <p className="text-gray-500">
                      テンプレートをご用意しておりますので、ブログのデザインは不要です。ワンクリックで選んですぐにスタートできます。
                    </p>
                  </div>
                </div>

                <div className="flex divide-x rounded-lg border bg-gray-50">
                  <div className="flex items-center p-2 text-indigo-500 md:p-4">
                    <Icons.billing />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      AI執筆
                    </h3>
                    <p className="text-gray-500">
                      Notionで搭載されているAI執筆を利用して、ブログ執筆が可能です。面倒な記事作成は丸ごとAIに任せてましょう。
                    </p>
                  </div>
                </div>

                <div className="flex divide-x rounded-lg border bg-gray-50">
                  <div className="flex items-center p-2 text-indigo-500 md:p-4">
                    <Icons.pizza />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      収益化
                    </h3>
                    <p className="text-gray-500">
                      GoogleアドセンスIDをご用意いただくだけで、すぐにNotionブログで収益化がスタートできます。さらなる副収入を獲得しましょう。
                    </p>
                  </div>
                </div>

                <div className="flex divide-x rounded-lg border bg-gray-50">
                  <div className="flex items-center p-2 text-indigo-500 md:p-4">
                    <Icons.trash />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-semibold md:text-xl">
                      他サービスとの連携
                    </h3>
                    <p className="text-gray-500">
                      Notionは他の多くのサービスと連携でき、効率的なワークフローを実現します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
