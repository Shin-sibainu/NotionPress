import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "notfound",
};

export default function NotFoundPage() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-bold md:text-4xl">
          お探しのページは見つかりませんでした。
        </h1>

        <div>
          <Link href={"/"} className="text-blue-500 underline">
            NotionPressへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
