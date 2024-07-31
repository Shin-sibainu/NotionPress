import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowToStartWithNotionPress = () => {
  return (
    <div className="container py-7">
      <article className="prose lg:prose-xl">
        <h2 className="underline underline-offset-4">
          NotionPressでNotionブログの始め方
        </h2>
        <p>大きく分けて3つのステップがあります。</p>
        <ol className="font-bold">
          <li>ドメインとテンプレートの決定</li>
          <li>NotionToken と NotionIdの取得</li>
          <li>ブログの完成🚀</li>
        </ol>
        <p>1つずつ解説します。</p>
        <h3 className="underline underline-offset-4">
          ①ドメインとテンプレートの決定
        </h3>
        <p>これはNotionPressのセットアップ時の指示に従うだけでOKです。</p>
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
        <h3 className="underline underline-offset-4">
          ②NotionToken と NotionIdの取得
        </h3>
        <p>少し難しいので、詳細に説明します。</p>
        {/* https://temp.co.jp/blog/2024-01-21-notion-integration-connect#STEP.1%20Notion%20%E9%96%8B%E7%99%BA%E8%80%85%E7%94%A8%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9 */}
        <h4 className="font-bold text-xl">📌NotionTokenの取得</h4>
        まずは
        <Link href="https://developers.notion.com/" className="text-blue-700">
          Notion の開発者用ページ
        </Link>
        にアクセスし、右上の View my integrations ボタンをクリックしてください。
      </article>
    </div>
  );
};

export default HowToStartWithNotionPress;
