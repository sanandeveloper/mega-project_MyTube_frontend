import React, { useCallback } from "react";

function Pagination({ page, setPage, totalPages, totallength }) {
  const prevPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page, setPage]);

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex items-center gap-4 bg-white shadow-lg rounded-3xl px-8 py-4 border border-gray-100">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
          }`}
        >
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                page === index + 1
                  ? "bg-blue-700 text-white shadow-md scale-105"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <h3 className="text-gray-600 font-medium text-sm tracking-wide">
          {totallength} Page
        </h3>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
