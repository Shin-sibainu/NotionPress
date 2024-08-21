import Image from "next/image";
import Link from "next/link";
import React from "react";

// export const dynamic = "force-static";

const HowToStartWithNotionPress = () => {
  return (
    <div className="container py-7">
      <article className="prose lg:prose-xl mx-auto">
        <h2 className="">【NotionPressでNotionブログの始め方】</h2>
        <p>
          大きく分けて5つのステップがあります。
          <Link
            href=""
            className="text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            (動画で理解したい方はこちら)
          </Link>
        </p>
        <ol className="font-bold">
          <li>ドメインとテンプレートの決定</li>
          <li>NotionTokenの取得</li>
          <li>インテグレーションとNotionデータベースを連携する</li>
          <li>NotionIDの取得</li>
          <li>ブログの完成🚀</li>
        </ol>
        <p>1つずつ解説します。</p>
        <h3 className="underline">①ドメインとテンプレートの決定</h3>
        <p>
          <Link
            href={"/setup"}
            className="text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            今すぐはじめる
          </Link>
          ボタンを押して始めましょう。
        </p>
        <p>
          アカウント作成から始めて、NotionPressのセットアップ時の指示に従うだけでOKです。
        </p>
        <div>
          <Image
            src="/images/setup/notion-press-step-1.png"
            width={900}
            height={1000}
            alt="notion-press-step-1"
            className="border shadow-md"
          />
          <Image
            src="/images/setup/notion-press-step-2.png"
            width={900}
            height={1000}
            alt="notion-press-step-2"
            className="border shadow-md"
          />
        </div>
        <p>
          ※テンプレートの有料を選んだ場合は、最後のステップで決済画面に移動します。
        </p>
        {/* https://temp.co.jp/blog/2024-01-21-notion-integration-connect#STEP.1%20Notion%20%E9%96%8B%E7%99%BA%E8%80%85%E7%94%A8%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9 */}
        <h3 className="underline">②NotionTokenの取得</h3>
        まずは
        <Link
          href="https://developers.notion.com/"
          className="text-blue-700"
          target="_blank"
          rel="noreferrer"
        >
          Notion の開発者用ページ
        </Link>
        にアクセスし、右上の View my integrations ボタンをクリックしてください。
        <Image
          src="/images/setup/notion-press-step-3.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>
          続いて、インテグレーションを作成していきましょう。下の画像のように「新しいインテグレーションの作成」を押しましょう。
        </p>
        <Image
          src="/images/setup/notion-press-step-4.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>
          続いて、基本情報を入力していきます。
          ワークスペースが見つからない方はNotionアプリから作成をお願いします。種類は「内部」でOKです。
        </p>
        <Image
          src="/images/setup/notion-press-step-5.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>保存を押すとNotion Tokenが取得できるようになります。</p>
        <Image
          src="/images/setup/notion-press-step-6.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>
          ※このTokenは外部に漏らさないように厳重に管理するようにしてください。
        </p>
        <h3 className="underline">
          ③インテグレーションとNotionデータベースを連携する
        </h3>
        <p>
          あともう少しです。先ほど取得したNotion
          TokenとNotionデータベースを連携していきましょう。
        </p>
        <p>
          まずは下の画像のように「/」を入力して「データベース：フルページ」を選択します。
        </p>
        <Image
          src="/images/setup/notion-press-step-7.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>そしてページ右上の3点ボタンをクリックします。</p>
        <Image
          src="/images/setup/notion-press-step-8.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>接続先から先ほど作成したIntegrationを選択して連携すれば完了です。</p>
        <Image
          src="/images/setup/notion-press-step-9.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <h3 className="underline">④NotionIDの取得</h3>
        <p>あともう少しです。</p>
        <p>
          NotionIDを取得します。下記の画像のように「リンクをコピー」をクリックします。
        </p>
        <Image
          src="/images/setup/notion-press-step-10.png"
          width={900}
          height={1000}
          alt="notion-press-step-2"
          className="border shadow-md"
        />
        <p>すると、以下のようなURLが取得できるはずです。</p>
        <p>https://www.notion.so/XXXXXXXX?v=YYYYYYYY</p>
        <p>
          NotionIDは<b>「XXXXXXXX」</b>
          の部分になります。
        </p>
        <p>
          このNotionIDとNotionTokenをブログセットアップ時に貼り付けてください。読み込めたら成功です。
        </p>
        {/* secret_FIv64LXf28PS0iP07r80Q25clE5eiR0d9a8IaPI6p3o */}
        {/* https://www.notion.so/5bd46573e266477dbe5352beb68963ea?v=5c430d3d906042b4bca448d9b665947e&pvs=4 */}
      </article>
    </div>
  );
};

export default HowToStartWithNotionPress;
