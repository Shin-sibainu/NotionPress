import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/lib/Icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// export const dynamic = "force-static";

export default function IndexPage() {
  return (
    <div className="bg-gradient-to-b from-[#faf9f8] to-[#fffcfa]">
      <section className="container">
        <div className="md:py-16 space-y-6 py-6 mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-blue-900">
            たった3分で
            <span className="text-orange-600">Notionブログ</span>
            作成
          </h1>
          <p className="text-sm md:text-2xl text-gray-600 max-w-2xl mx-auto">
            プログラムの知識は一切必要ありません。
            <br />
            今日からNotionでブログ投稿をはじめましょう。
          </p>
          <div className="space-x-4 mt-8">
            <Link
              href={"/setup"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-orange-400 hover:bg-orange-500"
              )}
            >
              今すぐ始める
            </Link>
            <Link
              href={"/blog/templates"}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "text-orange-400 border-orange-400 hover:text-orange-500 hover:border-orange-500"
              )}
            >
              テンプレート一覧
            </Link>
          </div>
        </div>

        <div className="mx-auto md:-mt-14">
          {/* <iframe
            src="https://player.vimeo.com/video/948201541?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            className="w-full aspect-video"
            title="NotionPressの使い方"
          ></iframe> */}
          {/* <Script src="https://player.vimeo.com/api/player.js"></Script> */}
          <Image
            src={"/images/notion-top-page-image-6.png"}
            alt="top-page-image"
            width={1280}
            height={600}
            className="mx-auto"
          />
        </div>
      </section>

      <section id="feature" className="container md:py-24 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-orange-600 mb-12">
            NotionPressの特徴
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <FeatureCard
              icon={<Icons.article className="w-10 h-10 text-blue-600" />}
              title="Notionで簡単作成"
              description="プログラミング不要。Notionで書くだけで、美しいブログが完成します。"
            />
            <FeatureCard
              icon={<Icons.check className="w-10 h-10 text-green-600" />}
              title="無料でスタート"
              description="基本機能は無料。テンプレートの種類によっては課金が必要です。"
            />
            <FeatureCard
              icon={<Icons.media className="w-10 h-10 text-purple-600" />}
              title="豊富なテンプレート"
              description="テンプレートからワンクリックで選んでブログを開始できます。"
            />
            <FeatureCard
              icon={<Icons.billing className="w-10 h-10 text-yellow-600" />}
              title="AIブログ執筆"
              description="NotionのAI機能を活用し、記事作成を効率化できます。"
            />
          </div>
        </div>
      </section>

      <section className="md:py-24 py-16">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-orange-600 mb-12">
            魅力的なテンプレート
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            あなたの好みに合わせて選べる多彩なデザイン。
            クリック一つで、プロ級のブログデザインを適用できます。
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <TemplateCard
              href="/basic/TestBlog"
              imageSrc="/images/blog/blog-post-1.jpg"
              title="ベーシックテンプレート"
              description="シンプルで使いやすい、初心者向けデザイン"
            />
            <TemplateCard
              href="/classic/TestBlog"
              imageSrc="/images/blog/blog-post-2.jpg"
              title="クラシックテンプレート"
              description="落ち着いた雰囲気の、読みやすいデザイン"
            />
          </div>
        </div>
      </section>

      <section className="container md:py-24 py-16 bg-gray-100 rounded-md">
        <h2 className="text-2xl md:text-5xl font-bold text-center text-orange-900 md:mb-16 mb-10">
          使い方は<span className="text-orange-600">簡単</span>3ステップ
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 inset-y-0 w-1 bg-orange-200 rounded"></div>
            <StepItem
              number="1"
              title="Notion基本データの入力"
              description="ステップに従ってドメイン名とテンプレートを決める。"
            />
            <StepItem
              number="2"
              title="Notionでデータベースの作成"
              description="Notionで作成したデータベースからNotion Token/Notion IDを取得して入力。"
            />
            <StepItem
              number="3"
              title="Notionブログ完成🚀"
              description="設定完了！あなたの記事が美しいブログとして公開されます。SNSで共有して読者を増やしましょう。"
            />
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Link
              href={"/setup"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-orange-600 hover:bg-orange-700"
              )}
            >
              今すぐ始める
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="container py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-16">
          ユーザーの<span className="text-blue-600">声</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="NotionPressのおかげで、ブログ運営がこんなに簡単だとは思いませんでした。Notionユーザーには必須のツールです！"
            author="田中 花子"
            role="フリーランスライター"
          />
          <TestimonialCard
            quote="プログラミングの知識がなくても、プロ級のブログが作れるなんて感動です。しかも無料から始められるのが嬉しいですね。"
            author="佐藤 太郎"
            role="起業家"
          />
        </div>
      </section> */}
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TemplateCard({ href, imageSrc, title, description }: any) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={500}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

function StepItem({ number, title, description }: any) {
  return (
    <div className="relative pl-16 pb-8">
      <div className="absolute left-0 top-0 bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// function TestimonialCard({ quote, author, role }: any) {
//   return (
//     <div className="bg-white p-8 rounded-xl shadow-lg">
//       <div className="text-4xl text-blue-500 mb-4">"</div>
//       <p className="text-lg text-gray-700 mb-6">{quote}</p>
//       <div>
//         <p className="font-semibold">{author}</p>
//         <p className="text-gray-500">{role}</p>
//       </div>
//     </div>
//   );
// }
