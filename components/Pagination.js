import React from "react";

function Pagination3({ pagination, onChange }) {
  const previousPage = () => {
    if (pagination.page > 1)
      onChange({ ...pagination, page: pagination.page - 1 });
  };
  const nextPage = () => {
    if (pagination.page < pagination.last_page) {
      onChange({ ...pagination, page: pagination.page + 1 });
    }
  };

  if (pagination.last_page == 1) return <></>;

  return (
    <div className="flex justify-between items-center py-4">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        disabled={!pagination.prev}
        onClick={previousPage}
      >
        Previous
      </button>
      <span className="text-gray-700 font-bold">
        Page {pagination.current_page} of {pagination.last_page}
      </span>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        disabled={!pagination.next}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}
function Pagination({ pagination, onChange }) {
  console.log(pagination, JSON.stringify(pagination));

  const previousPage = () => {
    console.log(pagination);
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
