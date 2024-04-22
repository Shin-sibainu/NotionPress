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
import { NotionToMarkdown } from "notion-to-md";

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
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
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
    result.push(getPageMetaData(post));
  }

  return result;
};

export const getPostsForHomePage = async (
  notion: Client,
  notionId: string,
  pageSize: number = 4
) => {
  const allPostForHome = await getAllPosts(notion, notionId);
  return allPostForHome.slice(0, pageSize);
};

export const getDetailPost = async (
  notion: Client,
  notionId: string,
  slug: string
) => {
  const response = await notion.databases.query({
    database_id: notionId,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0] as PageObjectResponse;
  const metadata = getPageMetaData(page);

  //https://github.com/souvikinator/notion-to-md
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks).parent;

  return {
    metadata,
    markdown: mdString,
  };
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

function getPageMetaData(post: PageObjectResponse) {
  return {
    id: post.id,
    title: getTitle(post),
    tags: getTags(post),
    date: getDate(post),
    slug: getSlug(post),
  };
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

function getSlug(page: PageObjectResponse): string {
  const slug = page.properties.Slug;
  return slug.type === "rich_text" && slug.rich_text.length > 0
    ? slug.rich_text[0].plain_text
    : "";
}
