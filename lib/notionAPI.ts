import { Client } from "@notionhq/client";

export const notionInit = (integrationToken: string) => {
  let notion = new Client({
    auth: integrationToken,
  });

  return notion;
};
