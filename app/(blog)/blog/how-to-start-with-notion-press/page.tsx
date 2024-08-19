import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowToStartWithNotionPress = () => {
  return (
    <div className="container py-7">
      <article className="prose lg:prose-xl mx-auto">
        <h2 className="">【NotionPressでNotionブログの始め方】</h2>
        <p>
          大きく分けて3つのステップがあります。
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
          <li>NotionToken と NotionIdの取得</li>
          <li>ブログの完成🚀</li>
        </ol>
        <p>1つずつ解説します。</p>
        <h3>①ドメインとテンプレートの決定</h3>
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
        <h3>②NotionToken と NotionIdの取得</h3>
        <p>少し難しいので、詳細に説明します。</p>
        {/* https://temp.co.jp/blog/2024-01-21-notion-integration-connect#STEP.1%20Notion%20%E9%96%8B%E7%99%BA%E8%80%85%E7%94%A8%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9 */}
        <h4 className="font-bold text-xl">📌NotionTokenの取得</h4>
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
        <h4 className="font-bold text-xl">
          📌作成したインテグレーションとNotionデータベースを連携する
        </h4>
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
      </article>
    </div>
  );
};

export default HowToStartWithNotionPress;
