type generatePageNumbersPropsType = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  pageNumbersToShow?: number;
};

export const generatePageNumbers = ({
  currentPage,
  pageSize,
  totalPages,
  pageNumbersToShow = 5, // Отображаем 5 страниц вместо 3
}: generatePageNumbersPropsType) => {
  const lastPageNumber = Math.ceil(totalPages / pageSize);
  const currentPageNumber = currentPage <= lastPageNumber ? currentPage : lastPageNumber;
  const halfPagesToShow = Math.floor(pageNumbersToShow / 2);

  let startPage: number;
  let endPage: number;

  if (lastPageNumber <= pageNumbersToShow) {
    startPage = 1;
    endPage = lastPageNumber;
  } else if (currentPageNumber <= halfPagesToShow + 1) {
    startPage = 1;
    endPage = pageNumbersToShow;
  } else if (currentPageNumber >= lastPageNumber - halfPagesToShow) {
    startPage = lastPageNumber - pageNumbersToShow + 1;
    endPage = lastPageNumber;
  } else {
    startPage = currentPageNumber - 1;
    endPage = currentPageNumber + 1;
  }

  let pageNumbers: (string | number)[] = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  if (startPage > 1) {
    pageNumbers = [1, startPage > 2 ? "..." : 2, ...pageNumbers];
  }

  if (endPage < lastPageNumber) {
    pageNumbers = [...pageNumbers, endPage < lastPageNumber - 1 ? "..." : lastPageNumber - 1, lastPageNumber];
  }

  return pageNumbers;
};
