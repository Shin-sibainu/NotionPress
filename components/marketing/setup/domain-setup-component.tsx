"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DomainSetupComponent({
  onSuccess,
  updateData,
}: {
  onSuccess: () => void;
  updateData: (data: { siteDomain: string }) => void;
}) {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (domain === "") {
      setError("URLを記入してください。");
      return;
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(domain)) {
      setError(
        "ドメイン名は英数字とハイフンのみで、先頭と末尾は英数字にしてください。"
      );
      return;
    }

    updateData({ siteDomain: domain });
    setError("");

    //TODO:ドメインが利用できるかチェックできる関数が欲しい。
    onSuccess();
  };

  return (
    <>
      <h3 className="font-medium text-3xl">2ステップ</h3>
      <p className="text-muted-foreground">
        公開するブログのURL(ドメイン名)を決めてください。
      </p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="domain">URL名</Label>
          <Input
            id="domain"
            placeholder="notionpress"
            className="mt-1"
            onChange={(e) => {
              setError("");
              setDomain(e.target.value);
            }}
            value={domain}
          />
          {error && <p className="text-red-500 mt-1 font-bold">{error}</p>}
        </div>
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          type="submit"
        >
          決定
        </button>
      </form>
    </>
  );
}
