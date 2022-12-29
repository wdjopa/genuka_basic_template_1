import React from "react";

function Pagination({ pagination, onChange }) {
  const previousPage = () => {
    if (pagination.current_page > 1) {
      const newPage = pagination.current_page - 1;
      onChange({ ...pagination, page: newPage, current_page: newPage });
    }
  };
  const nextPage = () => {
    if (pagination.current_page < pagination.last_page) {
      const newPage = pagination.current_page + 1;
      onChange({ ...pagination, page: newPage, current_page: newPage });
    }
  };

  if (pagination.last_page == 1) return <></>;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-center">
        <button
          onClick={previousPage}
          className="relative inline-flex z-0 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <div className="text-gray-700 text-center flex items-center justify-center w-36">
          Page {pagination.current_page} of {pagination.last_page}
        </div>
        <button
          onClick={nextPage}
          className="relative ml-3 inline-flex z-0 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
