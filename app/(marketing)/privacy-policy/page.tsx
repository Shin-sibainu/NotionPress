// src/pages/privacy-policy.tsx

import React from "react";
import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>プライバシーポリシー | NotionPress</title>
        <meta
          name="description"
          content="NotionPressアプリのプライバシーポリシー"
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">プライバシーポリシー</h1>
        <p className="text-sm text-gray-600 mb-4">最終更新日: 2023年7月29日</p>
        <div className="prose max-w-none">
          <h2>1. はじめに</h2>
          <p>
            NotionPressアプリ（以下、「本アプリ」といいます）は、ユーザーのプライバシーを尊重し、
            個人情報の保護に努めています。本プライバシーポリシーは、本アプリの利用に関して
            収集する情報と、その使用方法について説明します。
          </p>

          <h2>2. 収集する情報</h2>
          <p>本アプリは、以下の情報を収集する場合があります：</p>
          <ul>
            <li>アカウント情報：ユーザー名、メールアドレス、パスワード</li>
            <li>プロフィール情報：名前、プロフィール画像（任意）</li>
            <li>
              コンテンツデータ：ユーザーが作成、編集、または共有するノート、文書、画像
            </li>
            <li>
              利用データ：アプリの使用頻度、機能の利用状況、クラッシュレポート
            </li>
            <li>デバイス情報：デバイスの種類、OSバージョン、IPアドレス</li>
          </ul>

          <h2>3. 情報の使用目的</h2>
          <p>収集した情報は、以下の目的で使用されます：</p>
          <ul>
            <li>アプリの機能提供と改善</li>
            <li>ユーザーサポートの提供</li>
            <li>アカウントの管理と認証</li>
            <li>サービスの利用状況の分析と改善</li>
            <li>法的義務の遵守</li>
          </ul>

          <h2>4. 情報の共有</h2>
          <p>
            ユーザーの個人情報は、以下の場合を除き、第三者と共有されることはありません：
          </p>
          <ul>
            <li>ユーザーの同意がある場合</li>
            <li>法的要請がある場合</li>
            <li>
              サービス提供に必要な外部委託先との共有（これらの委託先も同等のプライバシー保護義務を負います）
            </li>
          </ul>

          <h2>5. データの保護</h2>
          <p>
            本アプリは、ユーザーの個人情報を保護するために適切な技術的・組織的措置を講じています。
            ただし、インターネット上での完全な安全性を保証することはできません。
          </p>

          <h2>6. ユーザーの権利</h2>
          <p>ユーザーには以下の権利があります：</p>
          <ul>
            <li>個人情報へのアクセス</li>
            <li>個人情報の訂正</li>
            <li>個人情報の削除（「忘れられる権利」）</li>
            <li>データポータビリティ（自身のデータの受け取り）</li>
          </ul>
          <p>
            これらの権利行使については、以下の連絡先までお問い合わせください。
          </p>

          <h2>7. クッキーとトラッキング技術</h2>
          <p>
            本アプリは、サービス改善のためにクッキーや類似の技術を使用する場合があります。
            ユーザーはブラウザ設定でこれらを制御できます。
          </p>

          <h2>8. 子どものプライバシー</h2>
          <p>
            本アプリは13歳未満の子どもからの個人情報の収集を意図的に行いません。
          </p>

          <h2>9. プライバシーポリシーの変更</h2>
          <p>
            本ポリシーは随時更新される場合があります。重要な変更がある場合は、アプリ内で通知します。
          </p>

          <h2>10. お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するご質問やご懸念がある場合は、以下の連絡先までお問い合わせください：
          </p>
          <div>
            <ul>
              <li>
                <Link href="https://x.com/Shin_Engineer">
                  開発者Xアカウント
                </Link>
              </li>
              <li>メールアドレス：shincodeinc@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
