import { useState } from "react";
import { useRouter } from "next/router";

type PaginationProps = {
  totalPages: number;
};

const Pagination = ({ totalPages }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`, undefined, { shallow: true });
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button key={page} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};
export default Pagination;
