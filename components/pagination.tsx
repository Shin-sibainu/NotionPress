import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageLink } from "@/utils/blog/blog-helper";

export function PaginationComponent({
  numberOfPages,
  tag,
  currentPageNumber,
}: {
  numberOfPages: number;
  tag: string;
  currentPageNumber: number;
}) {
  let pages: number[] = [];
  const maxPagesToShow = 2; // 現在のページの前後に表示するページ数
  // ページ範囲を計算
  let startPage = Math.max(1, currentPageNumber - maxPagesToShow);
  let endPage = Math.min(numberOfPages, currentPageNumber + maxPagesToShow);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push(-1); // -1 は省略記号を表す
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < numberOfPages) {
    if (endPage < numberOfPages - 1) {
      pages.push(-1); // 省略記号
    }
    pages.push(numberOfPages);
  }

  let nextPageNumber = currentPageNumber + 1;
  let prevPageNumber = currentPageNumber - 1;

  return (
    <Pagination>
      <PaginationContent>
        {currentPageNumber > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPageLink(tag, prevPageNumber)} />
          </PaginationItem>
        )}

        {pages.map((page) =>
          page === -1 ? (
            <PaginationItem key={page}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageLink(tag, page)}
                isActive={page === currentPageNumber}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPageNumber < numberOfPages && (
          <PaginationItem>
            <PaginationNext href={getPageLink(tag, nextPageNumber)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
