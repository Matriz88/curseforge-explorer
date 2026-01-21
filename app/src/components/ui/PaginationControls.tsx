interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationControlsProps) => {
  const canGoPrevious = currentPage > 0 && !disabled;
  const canGoNext = currentPage < totalPages - 1 && !disabled;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600 text-white rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 disabled:border-gray-800"
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="text-sm text-gray-400">
        Page {currentPage + 1} of {totalPages || 1}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-600 text-white rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 disabled:border-gray-800"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};
