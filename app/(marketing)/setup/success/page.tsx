"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetupSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [blogStatus, setBlogStatus] = useState("");



  useEffect(() => {
    if (session_id) {
      checkPaymentAndBlogStatus();
    } else {
      setStatus("error");
      setErrorMessage("Session ID is missing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  async function checkPaymentAndBlogStatus() {
    try {
      const response = await fetch(
        "/api/stripe/check-payment-and-blog-status",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "An error occurred while checking status"
        );
      }

      const data = await response.json();
      setPaymentStatus(data.paymentStatus);
      setBlogStatus(data.blogStatus);

      if (data.paymentStatus === "paid") {
        if (data.blogStatus === "created") {
          //プロフィール画像の更新
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateUserProfileImage`,
            {
              method: "POST",
              headers: {
                "Content-Types": "application/json",
              },
            }
          );

          router.push(`/${data.domain}/dashboard/blog`);
        } else {
          setStatus("creating");
          // setTimeout(checkPaymentAndBlogStatus, 5000);
        }
      } else {
        setStatus("error");
        setErrorMessage(`Payment not completed. Status: ${data.paymentStatus}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }

  // レンダリングロジック
  return (
    <div className="container mx-auto p-4">
      {status === "verifying" && (
        <div className="text-center">
          <p className="text-xl">決済を確認中...</p>
          <p className="mt-2">しばらくお待ちください。</p>
        </div>
      )}
      {status === "creating" && (
        <div className="text-center">
          <p className="text-xl">ブログを作成中...</p>
          <p className="mt-2">このプロセスには数分かかる場合があります。</p>
        </div>
      )}
      {status === "error" && (
        <div className="text-center text-red-600">
          <p className="text-xl">エラーが発生しました。</p>
          {errorMessage && <p className="mt-2">{errorMessage}</p>}
          <p className="mt-4">
            問題が解決しない場合は、サポートにお問い合わせください。
          </p>
        </div>
      )}
      {(paymentStatus || blogStatus) && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">ステータス情報:</h2>
          <p>支払い状態: {paymentStatus}</p>
          <p>ブログ作成状態: {blogStatus}</p>
        </div>
      )}
    </div>
  );
}
