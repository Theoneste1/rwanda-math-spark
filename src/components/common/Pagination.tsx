
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Props interface for the Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showItemCount?: boolean;
  className?: string;
}

// Reusable pagination component for tables and lists
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 8,
  totalItems = 0,
  showItemCount = true,
  className = ""
}) => {
  // Calculate visible page numbers (show max 8 pages as requested)
  const getVisiblePages = () => {
    const maxVisible = 8; // Maximum 8 page numbers as requested
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Calculate item range for current page
  const getItemRange = () => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return { startItem, endItem };
  };

  const visiblePages = getVisiblePages();
  const { startItem, endItem } = getItemRange();

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}>
      {/* Item count display */}
      {showItemCount && totalItems > 0 && (
        <div className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalItems} items
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex space-x-1">
          {/* First page if not visible */}
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                page === currentPage
                  ? 'text-white bg-blue-600 border border-blue-600'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          {/* Last page if not visible */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
