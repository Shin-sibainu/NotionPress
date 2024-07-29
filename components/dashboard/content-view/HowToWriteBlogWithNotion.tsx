import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { getDomainAndTemplateIdAndProfileImageUrl } from "@/utils/supabase/auth-helpers/getUserData";
import { templateIdToTemplateName } from "@/utils/switch-templateId-to-templateName";

export default async function HowToWriteBlogWithNotion({
  user,
}: {
  user: User;
}) {
  const userId = user.id;
  const supabase = supabaseServer();
  const userData = await getDomainAndTemplateIdAndProfileImageUrl(
    supabase,
    userId
  );
  const domain = userData?.domain;
  const blogTemplatePlan = templateIdToTemplateName(userData?.template_id);

  return (
    <article className="max-w-3xl px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Notionブログの書き方
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Notionのデータベースを使ってブログ記事を執筆する方法を解説します。
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          動画で理解したい方はこちら👇
        </h2>
        <div className="aspect-w-16 aspect-h-9">
          <YouTubeEmbed videoid="your-video-id-here" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          テキストで理解したい方はこちら👇
        </h2>

        <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
          ①カラムの追加
        </h3>
        <p className="mb-4">
          以下の画像のように、既にNotionのデータベースページを作成していると思います。
        </p>
        <Image
          src="/images/dashboard/notion-database-page.png"
          width={800}
          height={324}
          alt="Notionデータベースページ"
          className="rounded-lg shadow-md mb-4"
        />
        <p className="mb-4">
          初期状態ではカラムが「名前」と「タグ」だけしかなく、カラム属性も足りないので、
          以下の画像のように修正してください。
        </p>
        <Image
          src="/images/dashboard/notion-database-property-add.png"
          width={800}
          height={202}
          alt="Notionデータベースプロパティ追加"
          className="rounded-lg shadow-md mb-4"
        />
        <p className="mb-2">追加・修正したタグは以下の通りです：</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>「名前」➡「Name」</li>
          <li>「Slug」</li>
          <li>「タグ」➡「Tags」</li>
          <li>「Date」</li>
          <li>「Published」</li>
        </ul>
        <p className="mb-4">
          英語の文字列は正確に合わせるようにしてください。
          例えば、「Name」を「name」と記述すると記事投稿ができませんので、
          大文字小文字や綴りは正確に合わせるように気を付けましょう。
        </p>
        <p className="mb-2">また、割り当てるプロパティは以下です：</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>「Name」➡ デフォルトでOK</li>
          <li>「Slug」➡ テキスト</li>
          <li>「Tags」➡ マルチセレクト</li>
          <li>「Date」➡ 日付</li>
          <li>「Published」➡ チェックボックス</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
          ②記事の追加
        </h3>
        <p className="mb-4">最後に記事を追加します。</p>
        <p className="mb-4">
          下記のようにNameカラムのデータにカーソルを合わせると「開く」ボタンが出てきます。
        </p>
        <Image
          src="/images/dashboard/notion-database-page-open.png"
          width={600}
          height={373}
          alt="Notionデータベースページを開く"
          className="rounded-lg shadow-md mb-4"
        />
        <p className="mb-4">
          クリックすると、下画像のようにページが出現しますので、お好みに記事のタイトルや日付、
          タグを付与してから投稿してください。
        </p>
        <Image
          src="/images/dashboard/notion-database-page-sample-post.png"
          width={600}
          height={373}
          alt="Notionデータベースページサンプル投稿"
          className="rounded-lg shadow-md mb-4"
        />
        <p className="text-red-600 font-semibold mb-4">
          ※重複するslug名は割り当てないようにしてください（sample-postというslug名を複数の記事で利用する等）。
        </p>
        <p className="mb-4">
          これでブログ投稿は完了です。
          <Link
            href={`/${blogTemplatePlan}/${domain}`}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noreferrer"
          >
            ブログページ
          </Link>
          を覗いてみてください。記事が投稿されているはずです。
        </p>
      </section>
    </article>
  );
}
