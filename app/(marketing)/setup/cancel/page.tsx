import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return (
    <div className="container py-4 space-y-2">
      <p className="text-xl font-medium">決済がキャンセルされました。</p>
      <Link
        href={"/setup"}
        className="text-blue-500 underline underline-offset-2"
      >
        こちら
      </Link>
      をクリックして最初からセットアップをお願いいたします。
    </div>
  );
};

export default CancelPage;
