export default function Pagination({
  currentPage,
  totalPages,
  goToPage,
  pageNumbers,
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded disabled:cursor-not-allowed disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500"
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded transition-colors ${
            currentPage === page
              ? "bg-primary dark:bg-secondary text-white dark:text-primary"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded disabled:cursor-not-allowed disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500"
      >
        Next
      </button>
    </div>
  );
}
