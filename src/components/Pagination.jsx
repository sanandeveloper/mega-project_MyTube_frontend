import React, { useCallback } from "react";

function Pagination({ page, setPage, totalPages, }) {
  const prevPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page, setPage]);
  const limit={}
   
  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl px-6 py-3">
        {/* Prev Button */}
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>

        {/* Page Info / Children */}
        <div className="text-gray-700 font-semibold text-lg"> Page {page} of {totalPages}</div>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={page==totalPages}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
