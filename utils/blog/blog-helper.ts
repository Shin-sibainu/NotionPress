export const getPageLink = (tag: string, page: number) => {
  return tag ? `${page}` : `${page}`;
};

export const getPostDescription = (markdown: string) => {
  const cleanText = markdown.replace(/!\[.*?\]\(.*?\)/g, "");

  // HTMLタグを取り除く簡易的な処理（もしHTMLタグが含まれる場合）
  const textOnly = cleanText.replace(/<[^>]*>/g, "");

  // 改行や余分なスペースを削除
  const trimmedText = textOnly.replace(/\s+/g, " ").trim();

  // 最初の30文字を取得
  return trimmedText.slice(0, 200) + "...";
};
