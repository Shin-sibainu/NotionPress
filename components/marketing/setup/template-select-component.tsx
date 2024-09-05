"use client";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TemplateSelectComponent({
  onSuccess,
  onBack,
  updateData,
}: {
  onSuccess: () => void;
  onBack: () => void;
  updateData: (data: Partial<{ templateId: number }>) => void;
}) {
  const [templateId, setTemplateId] = useState<number>(0);
  const [templateError, setTemplateError] = useState("");

  const handleSelectBlogTemplate = () => {
    updateData({ templateId });
    if (templateId === 0) {
      setTemplateError("テンプレートを1つ選択してください。");
      return;
    }
    onSuccess();
  };

  return (
    <>
      <h3 className="font-medium text-3xl">3ステップ</h3>
      <p className="text-muted-foreground">
        お好きなブログテンプレートを選択してください。
      </p>

      <div>
        <div className="grid md:grid-cols-2 gap-5">
          <div
            className={`card rounded-md shadow-md p-4 space-y-2 cursor-pointer ${
              templateId === 1 && "border-green-300 border-2"
            }`}
            onClick={() => {
              setTemplateId(1);
              setTemplateError("");
            }}
          >
            <div className="h-64 overflow-hidden">
              {/* 画像コンテナ */}
              <Image
                src={"/images/notion-basic-template.png"}
                width={450}
                height={360}
                priority
                alt="blog-post-1"
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="flex justify-between items-center py-2">
                <h3 className="font-bold">ベーシック</h3>
                <Badge className={cn(badgeVariants({ variant: "free" }))}>
                  無料
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                無料で使えるブログテンプレートです。
              </p>
              <Link
                href="/basic/TestBlog"
                className="text-sm mt-3 inline-block underline"
                target="_blank"
                rel="noreferrer"
              >
                サンプルを見る
              </Link>
            </div>
          </div>
          <div
            className={`card rounded-md shadow-md p-4 space-y-2 cursor-pointer ${
              templateId === 2 && "border-green-300 border-2"
            }`}
            onClick={() => {
              setTemplateId(2);
              setTemplateError("");
            }}
          >
            <div className="h-64 overflow-hidden">
              {/* 画像コンテナ */}
              <Image
                src={"/images/notion-classic-template.png"}
                width={450}
                height={360}
                priority
                alt="blog-post-1"
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="flex justify-between items-center py-2">
                <h3 className="font-bold">クラシック</h3>
                <Badge className={cn(badgeVariants({ variant: "free" }))}>
                  無料
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                より凝ったブログテンプレートを使い方向けです。
              </p>
              <Link
                href="/classic/TestBlog"
                className="text-sm mt-3 inline-block underline"
                target="_blank"
                rel="noreferrer"
              >
                サンプルを見る
              </Link>
            </div>
          </div>

          {templateError && (
            <p className="text-red-500 font-bold -mt-2">{templateError}</p>
          )}
        </div>
      </div>

      <div className="space-x-2">
        <button
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => onBack()}
        >
          戻る
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={handleSelectBlogTemplate}
        >
          決定
        </button>
      </div>
    </>
  );
}
