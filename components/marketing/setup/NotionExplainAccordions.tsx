import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const NotionExplainAccordions = () => {
  return (
    <div className="mt-12">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Notion Integration Tokenはどこで入手できますか？
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href={
                "https://temp.co.jp/blog/2024-01-21-notion-integration-connect#STEP.1%20Notion%20%E9%96%8B%E7%99%BA%E8%80%85%E7%94%A8%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9"
              }
              className="text-sky-600 underline underline-offset-2 font-bold"
              target="_blank"
              rel="noreferrer"
            >
              こちら
            </Link>
            の記事を参考に取得してください。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Notion IDはどこで入手できますか？</AccordionTrigger>
          <AccordionContent>
            <Link
              href={"https://note.com/amatyrain/n/nb9ebe31dfab7"}
              className="text-sky-600 underline underline-offset-2 font-bold"
              target="_blank"
              rel="noreferrer"
            >
              こちら
            </Link>
            の記事を参考に取得してください。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default NotionExplainAccordions;
