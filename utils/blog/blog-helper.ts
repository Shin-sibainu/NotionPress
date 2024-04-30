export const getPageLink = (tag: string, page: number) => {
  return tag ? `${tag}/page/${page}` : `${page}`;
};
