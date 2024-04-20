import { NotionPageData } from "@/types";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { format } from "date-fns";

//https://github.com/ymtdzzz/notion-blog-converter/blob/main/src/notion/client.ts

export const notionInit = (integrationToken: string) => {
  let notion = new Client({
    auth: integrationToken,
  });

  return notion;
};

export const getAllPosts = async (notion: Client, notionId: string) => {
  let posts: PageObjectResponse[] = [];
  let cursor: string | undefined;
  let hasMore = false;

  try {
    do {
      const res: QueryDatabaseResponse = await notion.databases.query({
        database_id: notionId,
        start_cursor: cursor,
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      });

      hasMore = res.has_more;
      cursor = res.next_cursor ?? undefined; //nullish状態のチェック。左辺がnull or undefinedなら右側を返す。
      posts = posts.concat(
        res.results.filter((v) =>
          isPageObjectResponse(v)
        ) as PageObjectResponse[]
      );
    } while (hasMore);
  } catch (error) {
    throw new Error(`failed to fetch the blog posts: ${String(error)}`);
  }

  const result: NotionPageData[] = [];

  for (const post of posts) {
    result.push({
      id: post.id,
      title: getTitle(post),
      tags: getTags(post),
      date: getDate(post),
    });
  }

  return result;
};

export const getPostsForHomePage = async (
  notion: Client,
  notionId: string,
  pageSize: number = 4
) => {
  const allPostForHome = await getAllPosts(notion, notionId);
  console.log(allPostForHome);
  // return allPostForHome.slice(0, pageSize);
};

function isPageObjectResponse(
  res:
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
): res is PageObjectResponse {
  return (
    "parent" in res && "icon" in res && "cover" in res && "created_by" in res
  );
}

function getTitle(page: PageObjectResponse): string {
  const title = page.properties.Name;
  return title.type === "title" && title.title.length > 0
    ? title.title[0].plain_text
    : "";
}

function getTags(page: PageObjectResponse): string[] {
  const tags = page.properties["Tags"];
  return tags.type === "multi_select"
    ? tags.multi_select.map((val) => val.name)
    : [];
}

function getDate(page: PageObjectResponse): string {
  return format(new Date(page.last_edited_time), "yyyy-MM-dd");
}
