import React, { Dispatch, SetStateAction, useState } from "react";

interface PaginationProps {
  limit: number;
  total: number;
  setSkip: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ limit, total, setSkip }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setSkip((prev) => prev - limit);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setSkip((prev) => prev + limit);
    }
  };

  return (
    <div className="flex flex-wrap-reverse items-center justify-between sm:flex-col-reverse sm:justify-center">
      <span>
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold">{totalPages}</span> page(s)
      </span>
      <div className="font-bold">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`rounded-s-lg border border-blue-500 bg-blue-200 px-2 text-blue-500 ${currentPage === 1 ? "cursor-not-allowed" : "hover:border-blue-200 hover:bg-blue-500 hover:text-white"}`}
        >
          {"<"}
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`rounded-e-lg border border-l-0 border-blue-500 bg-blue-200 px-2 text-blue-500 ${currentPage === totalPages ? "cursor-not-allowed" : "hover:border-blue-200 hover:bg-blue-500 hover:text-white"}`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
