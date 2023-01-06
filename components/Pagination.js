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
    <div className="flex items-center justify-between  border-gray-200 bg-transparent">
      <div className="flex flex-1 justify-center">
        <button
          onClick={previousPage}
          className="relative inline-flex z-0 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Précédent
        </button>
        <div className="text-gray-700 text-center flex items-center justify-center px-2">
          Page {pagination.current_page} sur {pagination.last_page ?? 1}
        </div>
        <button
          onClick={nextPage}
          className="relative inline-flex z-0 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Pagination;
