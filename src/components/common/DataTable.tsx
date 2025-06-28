
import React from 'react';
import Pagination from './Pagination';

// Generic interface for table column definition
interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, item: T, index: number) => React.ReactNode;
  className?: string;
}

// Props interface for DataTable component
interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems: number;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  showPagination?: boolean;
  numberedRows?: boolean;
}

/**
 * Reusable DataTable component with pagination and consistent styling
 * Purpose: Provide standardized table display across the application
 * Features: Numbered rows, responsive design, pagination, loading states
 */
function DataTable<T>({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 8,
  totalItems,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  showPagination = true,
  numberedRows = true
}: DataTableProps<T>) {
  
  // Calculate row numbers for current page
  const getRowNumber = (index: number) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && data.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      )}

      {/* Table */}
      {!loading && data.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-50">
                  {/* Row Number Column */}
                  {numberedRows && (
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                      #
                    </th>
                  )}
                  
                  {/* Data Columns */}
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700 ${column.className || ''}`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((item, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Row Number Cell */}
                    {numberedRows && (
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-medium">
                        {getRowNumber(rowIndex)}
                      </td>
                    )}
                    
                    {/* Data Cells */}
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border border-gray-300 px-4 py-3 text-gray-700 ${column.className || ''}`}
                      >
                        {column.render
                          ? column.render(
                              item[column.key as keyof T],
                              item,
                              getRowNumber(rowIndex)
                            )
                          : String(item[column.key as keyof T] || '-')
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {showPagination && totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                showItemCount={true}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DataTable;
