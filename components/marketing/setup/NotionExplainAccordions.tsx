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
              href="/blog/how-to-start-with-notion-press#step2"
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
              href="/blog/how-to-start-with-notion-press#step4"
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
