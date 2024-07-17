import {
  getNumberOfPages,
  getAllPosts,
  getAllTags,
  getDetailPost,
  getPostByPage,
  getPostsByTagAndPage,
  getPostsForHomePage,
  notionInit,
  getNumberOfPagesByTag,
  getPostsByTagName,
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
    const homepagePosts = await getPostsForHomePage(notion, notionId);

    return homepagePosts;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPostsByPageData = async (
  notionToken: string,
  notionId: string,
  pageNumber: number
) => {
  const notion = notionInit(notionToken);

  try {
    const getPostsByPage = await getPostByPage(notion, notionId, pageNumber);

    return getPostsByPage;
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

export const getPostsByTagNameData = async (
  notionToken: string,
  notionId: string,
  tagName: string
) => {
  const notion = notionInit(notionToken);

  try {
    const allPostsByTagName = await getPostsByTagName(
      notion,
      notionId,
      tagName
    );

    return allPostsByTagName;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPostsByTagAndPageData = async (
  notionToken: string,
  notionId: string,
  pageNumber: number,
  tagName: string
) => {
  const notion = notionInit(notionToken);

  try {
    const postsByTagAndPage = await getPostsByTagAndPage(
      notion,
      notionId,
      pageNumber,
      tagName
    );

    return postsByTagAndPage;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getNumberOfPagesData = async (
  notionToken: string,
  notionId: string
) => {
  const notion = notionInit(notionToken);

  try {
    const numberOfPages = await getNumberOfPages(notion, notionId);

    return numberOfPages;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getNumberOfPagesByTagData = async (
  notionToken: string,
  notionId: string,
  tagName: string
) => {
  const notion = notionInit(notionToken);

  try {
    const numberOfPages = await getNumberOfPagesByTag(
      notion,
      notionId,
      tagName
    );

    return numberOfPages;
  } catch (err) {
    console.error(err);
    return null;
  }
};
