import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";
import { User } from "@supabase/supabase-js";
import { getDomainAndTemplateIdAndProfileImageUrl } from "@/utils/supabase/auth-helpers/getUserData";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { templateIdToTemplateName } from "@/utils/switch-templateId-to-templateName";
import Link from "next/link";

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
    <div className="px-4">
      <div className="space-y-10">
        <div>
          <h3 className="text-2xl md:text-3xl font-medium">
            Notionブログの書き方
          </h3>
          <p className="text-muted-foreground">
            Notionのデータベースを使ってブログ執筆の執筆方法を解説します。
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xl mb-2">動画で理解したい方はこちら👇</p>
          <YouTubeEmbed videoid="" />
        </div>

        <div className="space-y-1">
          <p className="text-xl mb-2">テキストで理解したい方はこちら👇</p>
          <h3 className="font-extrabold text-xl border-b-2 border-slate-400 sm:w-1/3 mb-2">
            ①カラムの追加
          </h3>
          <p>
            以下の画像ように、既にNotionのデータベースページを作成していると思います。
          </p>
          <Image
            src={"/images/dashboard/notion-database-page.png"}
            width={959}
            height={389}
            alt="notion-database-page"
            className="border rounded-md shadow"
          />
          <p>
            初期状態ではカラムが「名前」と
            「タグ」だけしかない、かつ、カラム属性が足りないので以下の画像ように修正してください。
          </p>
        </div>

        <div className="space-y-1">
          <Image
            src={"/images/dashboard/notion-database-property-add.png"}
            width={1341}
            height={338}
            alt="notion-database-page"
            className="border rounded-md shadow"
          />
          <p>追加・修正したタグは</p>
          <ul className="font-bold space-y-1">
            <li>・ 「名前」➡「Name」</li>
            <li>・ 「Slug」</li>
            <li>・ 「タグ」➡「Tags」</li>
            <li>・ 「Date」</li>
            <li>・ 「Published」</li>
          </ul>
          <p>
            になります。英語の文字列は正常に合わせるようにしてください。例えば、「Name」
            を「name」と記述すると記事投稿ができませんので、大文字小文字や綴りは正常に合わせるように気を付けましょう。
          </p>
        </div>

        <div className="space-y-1">
          <p>また、割り当てるプロパティは以下です。</p>
          <ul className="font-bold space-y-1">
            <li>・ 「Name」➡ デフォルトでOK</li>
            <li>・ 「Slug」➡ テキスト</li>
            <li>・ 「Tags」➡ マルチセレクト</li>
            <li>・ 「Date」➡ 日付</li>
            <li>・ 「Published」➡ チェックボックス</li>
          </ul>
          <p>になります。</p>
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-xl border-b-2 border-slate-400 sm:w-1/3 mb-2">
            ②記事の追加
          </h3>
          <p>最後に記事を追加します。</p>
          <p>
            下記のようにNameカラムのデータにカーソルを合わせると「開く」ボタンが出てきます。
          </p>
          <Image
            src={"/images/dashboard/notion-database-page-open.png"}
            width={444}
            height={276}
            alt="notion-database-page"
            className="border rounded-md shadow"
          />

          <p>
            クリックすると、下画像のようにページが出現しますので、お好みに記事のタイトルや日付、タグを付与してから投稿してください。
          </p>
          <Image
            src={"/images/dashboard/notion-database-page-sample-post.png"}
            width={444}
            height={276}
            alt="notion-database-page"
            className="border rounded-md shadow"
          />
          <p className="text-red-700 font-bold">
            ※重複するslug名は割り当てないようにしてください(sample-postというslug名を複数の記事で利用する等)。
          </p>
          <p>
            これでブログ投稿は完了です。
            <Link
              href={`/${blogTemplatePlan}/${domain}`}
              className="text-sky-700 underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              ブログページ
            </Link>
            を覗いてみてください。記事が投稿されているはずです。
          </p>
        </div>
      </div>
    </div>
  );
}
