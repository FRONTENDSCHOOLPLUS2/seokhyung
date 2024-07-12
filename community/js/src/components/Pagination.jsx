import React from 'react';

const Pagination = ({ currentPage, pages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-3 m-4">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-2 rounded-md ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
