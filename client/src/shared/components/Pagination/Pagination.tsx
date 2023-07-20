import React, { useState } from "react";
import "./Pagination.scss";
import { usePagination } from "../../hooks";

interface PaginationProps {
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRange:any = usePagination({
    currentPage,
    totalCount: totalPages,
    siblingCount: 1,
    pageSize: 1,
  });
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange?.length - 1];

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const handleFirstClick = () => {
    setCurrentPage(1);
    paginate(1);
  };

  const handleLastClick = () => {
    setCurrentPage(pageNumbers.length);
    paginate(pageNumbers.length);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        className="pagination-button"
        onClick={handleFirstClick}
      >
        &laquo;
      </button>
      <button
        disabled={currentPage === 1}
        className="pagination-button"
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      {paginationRange.map((number:number) => (
        <button
          key={number}
          className={`pagination-button ${
            number === currentPage ? "active" : ""
          }`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === lastPage}
        className="pagination-button"
        onClick={handleNextClick}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === lastPage}
        className="pagination-button"
        onClick={handleLastClick}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
