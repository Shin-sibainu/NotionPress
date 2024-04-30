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
//https://github.com/Shin-sibainu/notion-blog-udemy/blob/main/lib/notionAPI.ts

export const notionInit = (integrationToken: string) => {
  let notion = new Client({
    auth: integrationToken,
  });

  return notion;
};

//全記事情報取得
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

//Blogホームページ用
export const getPostsForHomePage = async (
  notion: Client,
  notionId: string,
  pageSize: number = 4
) => {
  const allPostForHome = await getAllPosts(notion, notionId);
  return allPostForHome.slice(0, pageSize);
};

//詳細記事
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

//タグ取得
export const getAllTags = async (notion: Client, notionId: string) => {
  const allPosts = await getAllPosts(notion, notionId);

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);

  return allTagsList;
};

//ブログ記事リスト(ページネーション)
export const getPostByPage = async (
  notion: Client,
  notionId: string,
  pageNumber: number
) => {
  const NUMBER_OF_POSTS_PER_PAGE = 5;

  const allPosts = await getAllPosts(notion, notionId);

  const startIndex = (pageNumber - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

//タグからブログ記事取得
export const getPostsByTagAndPage = async (
  notion: Client,
  notionId: string,
  pageNumber: number,
  tagName: string
) => {
  const NUMBER_OF_POSTS_PER_PAGE = 5;

  const allPosts = await getAllPosts(notion, notionId);
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  const startIndex = (pageNumber - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

//記事数からページ数をカウント取得
export const getNumberOfPages = async (notion: Client, notionId: string) => {
  const NUMBER_OF_POSTS_PER_PAGE = 5;
  const allPosts = await getAllPosts(notion, notionId);

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
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
