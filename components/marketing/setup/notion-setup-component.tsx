import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/lib/Icons";
import { cn } from "@/lib/utils";
import {
  validateNotionIdredentials,
  validateNotionTokenCredentials,
} from "@/utils/setup/check-domain-token-id";
import { useState } from "react";
import NotionExplainAccordions from "./NotionExplainAccordions";

//secret_uc7RDVzbGbIxkyStI2swlJejlAUsnQrPdEBz5hnYdfd
//127ef6b3de6b408880c046925f5917c6

export default function NotionSetupComponent({
  onSuccess,
  onBack,
  updateData,
}: {
  onSuccess: () => void;
  onBack: () => void;
  updateData: (
    data: Partial<{ notionToken: string; notionId: string }>
  ) => void;
}) {
  const [notionToken, setNotionToken] = useState("");
  const [notionId, setNotionId] = useState("");
  const [errorToken, setErrorToken] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorId, setErrorID] = useState("");
  const [errorNotionTokenCredentials, setErrorNotionTokenCredentials] =
    useState("");
  const [errorNotionIdCredentials, setErrorNotionIdCredentials] = useState("");

  async function validateCredentials(notionToken: string, notionId: string) {
    let responseNotionToken, responseNotionId;

    try {
      responseNotionToken = await validateNotionTokenCredentials(notionToken);
      if (!responseNotionToken.isValid) {
        setErrorNotionTokenCredentials(responseNotionToken.message);
      }
    } catch (error) {
      console.error("Error validating Notion token:", error);
      setErrorNotionTokenCredentials(
        "Notion Token validation failed due to an error."
      );
      setIsLoading(false);
    }

    try {
      let responseNotionId;

      if (responseNotionToken?.isValid) {
        responseNotionId = await validateNotionIdredentials(
          notionToken,
          notionId
        );
      }
      if (!responseNotionId?.isValid) {
        setErrorNotionIdCredentials(responseNotionId?.message);
      }

      return responseNotionToken?.isValid && responseNotionId?.isValid;
    } catch (error) {
      console.error("Error validating Notion ID:", error);
      setErrorNotionIdCredentials(
        "Notion ID validation failed due to an error."
      );
      setIsLoading(false);
    }
  }

  const handleSubmit = async () => {
    let isValid = true;
    setIsLoading(true);

    if (notionToken === "") {
      setErrorToken("Notion Integration Tokenを入力してください。");
      isValid = false;
      setIsLoading(false);
    } else {
      setErrorToken("");
    }

    if (notionId === "") {
      setErrorID("Notion IDを入力してください。");
      isValid = false;
      setIsLoading(false);
    } else {
      setErrorID("");
    }

    if (isValid) {
      updateData({ notionToken, notionId });

      //token, idが利用できるかチェックできる関数。
      const isValid = await validateCredentials(notionToken, notionId);
      if (isValid) {
        onSuccess();
      } else {
        setIsLoading(false);
        return;
      }
    }
  };

  return (
    <>
      <h3 className="font-medium text-3xl">最後のステップ</h3>
      <p className="text-muted-foreground">
        あなたのNotion情報を使ってNotionPressと連携させます。以下の情報を入力してください。
      </p>
      <div className="">
        <div>
          <Label
            htmlFor="notionToken"
            className={`${errorNotionTokenCredentials && "text-red-500"}`}
          >
            Notion Integration Token
          </Label>
          <Input
            id="notionToken"
            placeholder="secret_*****"
            className="mt-1"
            onChange={(e) => {
              setNotionToken(e.target.value);
              setErrorNotionTokenCredentials("");
              setErrorToken("");
            }}
            value={notionToken}
          />
          {errorToken && (
            <p className="text-red-500 mt-1 font-bold">{errorToken}</p>
          )}
        </div>
        <div className="mt-4">
          <Label
            htmlFor="notionId"
            className={`${errorNotionIdCredentials && "text-red-500"}`}
          >
            Notion ID
          </Label>
          <Input
            id="notionId"
            placeholder="https://www.notion.so/{Notion ID}?v=8241337ff0c0415dba363ea6d574190e&pvs=4"
            className="mt-1"
            onChange={(e) => {
              setNotionId(e.target.value);
              setErrorNotionIdCredentials("");
              setErrorID("");
            }}
            value={notionId}
          />
          {errorId && <p className="text-red-500 mt-1 font-bold">{errorId}</p>}
        </div>
        {errorNotionTokenCredentials && (
          <p className="text-red-500 font-bold">
            {errorNotionTokenCredentials}
          </p>
        )}
        {errorNotionIdCredentials && (
          <p className="text-red-500 font-bold">{errorNotionIdCredentials}</p>
        )}
      </div>
      <div className="space-x-2 flex items-center">
        <button
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => onBack()}
        >
          戻る
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <Icons.spinner className="animate-spin w-6 h-6" />
          ) : (
            "決定"
          )}
        </button>
      </div>

      <div>
        <NotionExplainAccordions />
      </div>
    </>
  );
}
