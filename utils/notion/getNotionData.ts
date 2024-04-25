import {
  getAllPosts,
  getAllTags,
  getDetailPost,
  getPostsForHomePage,
  notionInit,
} from "@/lib/notionAPI";

export const getAllNotionPosts = async (
  notionToken: string,
  notionId: string
) => {
  const notion = notionInit(notionToken);

  try {
    const allPosts = await getAllPosts(notion, notionId);

    return allPosts;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getNotionHomePagePosts = async (
  notionToken: string,
  notionId: string
) => {
  const notion = notionInit(notionToken);

  try {
    const honepagePosts = await getPostsForHomePage(notion, notionId);

    return honepagePosts;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getNotionDetailPostData = async (
  notionToken: string,
  notionId: string,
  slug: string
) => {
  const notion = notionInit(notionToken);

  try {
    const notionDetailBlogData = await getDetailPost(notion, notionId, slug);

    return notionDetailBlogData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllTagsData = async (notionToken: string, notionId: string) => {
  const notion = notionInit(notionToken);

  try {
    const allTags = await getAllTags(notion, notionId);

    return allTags;
  } catch (err) {
    console.error(err);
    return null;
  }
};
