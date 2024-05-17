import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/lib/Icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
              href={"/blog/templates"}
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
                  <div className="flex items-center p-2 md:p-4">
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
                  <div className="flex items-center p-2 md:p-4">
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
                  <div className="flex items-center p-2 md:p-4">
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
                  <div className="flex items-center p-2 md:p-4">
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
                  <div className="flex items-center p-2 md:p-4">
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
                  <div className="flex items-center p-2 md:p-4">
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

      <section className="py-6 sm:py-8 lg:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-5xl">
              ブログテンプレート
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              テンプレートを選んで、すぐにNotionブログ運用ができます。テンプレートは随時追加しています。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 xl:gap-8">
            <Link
              href={"/blog/templates"}
              className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/images/blog/blog-post-1.jpg"}
                loading="lazy"
                alt="ベーシックブログテンプレート"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                width={400}
                height={500}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

              <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 backdrop-blur md:px-3 md:text-sm">
                ベーシック
              </span>
            </Link>

            <Link
              href={"/blog/templates"}
              className="group relative flex h-48 items-end justify-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-96"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={"/images/blog/blog-post-2.jpg"}
                loading="lazy"
                alt="クラシックブログテンプレート"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                width={400}
                height={500}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

              <span className="relative mr-3 mb-3 inline-block rounded-lg border border-gray-500 px-2 py-1 text-xs text-gray-200 backdrop-blur md:px-3 md:text-sm">
                クラシック
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
