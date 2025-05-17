export default function Pagination({
    currentPage,
    totalPages,
    goToPage,
    pageNumbers
}) {


    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:cursor-not-allowed disabled:bg-white"                    >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded ${currentPage === page
                        ? "bg-primary text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:cursor-not-allowed disabled:bg-white">
                Next
            </button>
        </div >


    );
}