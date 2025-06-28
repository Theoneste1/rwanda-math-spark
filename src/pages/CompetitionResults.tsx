
import React, { useState } from 'react';
import { Search, AlertCircle, Users, User, GraduationCap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSheetData, filterResultsBySchoolCode } from '@/utils/googleSheetsApi';
import DataTable from '@/components/common/DataTable';
import PDFDownloader from '@/components/competition/PDFDownloader';

// Interface for competition result data structure
interface ResultData {
  'Student Name': string;
  'Gender': string;
  'Level': string;
  'Grade': string;
  'Decision': string;
  'School Code': string;
  'School Name': string;
  'Teacher Name': string;
}

/**
 * CompetitionResults page component
 * Purpose: Allow users to search and view JRMC2025 competition results by school code
 * Features: Round selection, school code search, paginated results, PDF download
 */
const CompetitionResults = () => {
  // State management for form inputs and pagination
  const [selectedRound, setSelectedRound] = useState<string>('Round 1');
  const [schoolCode, setSchoolCode] = useState<string>('');
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Constants for pagination and Google Sheets
  const ITEMS_PER_PAGE = 8;
  const SHEET_ID = '1_goCAnx9eFbY_hBHQpUggbWYQKWuKZrUPWP8s8zgpIM';
  
  // Map round selection to sheet tab names
  const getSheetName = (round: string): string => {
    const roundMap: Record<string, string> = {
      'Round 1': 'JRMC2025ROUND1',
      'Round 2': 'JRMC2025ROUND2',
      'Round 3': 'JRMC2025ROUND3'
    };
    return roundMap[round] || 'JRMC2025ROUND1';
  };

  // Fetch competition data from Google Sheets
  const { data: allResults = [], isLoading, error } = useQuery({
    queryKey: ['competition-results', selectedRound, schoolCode],
    queryFn: () => fetchSheetData(SHEET_ID, getSheetName(selectedRound)),
    enabled: searchInitiated && schoolCode.length > 0,
  });

  // Filter results by school code using exact matching
  const filteredResults = filterResultsBySchoolCode(allResults, schoolCode);
  
  // Calculate pagination values
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  // Extract school information from first result
  const schoolInfo = filteredResults.length > 0 ? {
    schoolName: filteredResults[0]['School Name'] || 'Unknown School',
    numberOfStudents: filteredResults.length,
    teacherName: filteredResults[0]['Teacher Name'] || 'Unknown Teacher',
    round: selectedRound
  } : null;

  // Define table columns for DataTable component
  const tableColumns = [
    {
      key: 'Student Name',
      label: 'Student Name',
      render: (value: string) => value || '-'
    },
    {
      key: 'Gender',
      label: 'Gender',
      render: (value: string) => value || '-'
    },
    {
      key: 'Level',
      label: 'Level',
      render: (value: string) => value || '-'
    },
    {
      key: 'Grade',
      label: 'Grade',
      render: (value: string) => value || '-'
    },
    {
      key: 'Decision',
      label: 'Decision',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value?.toLowerCase().includes('qualified') 
            ? 'bg-green-100 text-green-800'
            : value?.toLowerCase().includes('not')
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {value || '-'}
        </span>
      )
    }
  ];

  /**
   * Handles the search form submission
   * Validates input and initiates the search process
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (schoolCode.trim()) {
      setSearchInitiated(true);
      setCurrentPage(1); // Reset to first page on new search
    }
  };

  /**
   * Handles page changes in pagination
   * @param page - New page number to navigate to
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results for better UX
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Rwanda Mathematics Competition Results
          </h1>
          <p className="text-xl text-gray-600">
            Check JRMC2025 results by entering your school code
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Round Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Competition Round
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Round 1', 'Round 2', 'Round 3'].map((round) => (
                  <label key={round} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="round"
                      value={round}
                      checked={selectedRound === round}
                      onChange={(e) => setSelectedRound(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">{round}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* School Code Input */}
            <div>
              <label htmlFor="schoolCode" className="block text-sm font-medium text-gray-700 mb-2">
                School Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="schoolCode"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                  placeholder="Enter your school code (e.g., GS123)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={!schoolCode.trim() || isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Searching...' : 'Search Results'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {searchInitiated && (
          <div id="results-section" className="bg-white rounded-lg shadow-lg p-8">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading results...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center justify-center py-8">
                <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
                <p className="text-red-600">Failed to load results. Please try again.</p>
              </div>
            )}

            {/* No Results Found */}
            {!isLoading && !error && filteredResults.length === 0 && searchInitiated && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Results Found</h3>
                <p className="text-gray-600">
                  No results found for school code "{schoolCode}" in {selectedRound}.
                  Please check your school code and try again.
                </p>
              </div>
            )}

            {/* Results Display */}
            {!isLoading && !error && filteredResults.length > 0 && schoolInfo && (
              <>
                {/* School Information */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedRound} Results</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">School Name</p>
                        <p className="font-semibold">{schoolInfo.schoolName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Number of Students</p>
                        <p className="font-semibold">{schoolInfo.numberOfStudents}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600">Teacher Name</p>
                        <p className="font-semibold">{schoolInfo.teacherName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download PDF Button */}
                <div className="mb-6 flex justify-end">
                  <PDFDownloader
                    results={filteredResults}
                    schoolInfo={schoolInfo}
                  />
                </div>

                {/* Results Table using DataTable component */}
                <DataTable
                  data={paginatedResults}
                  columns={tableColumns}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={filteredResults.length}
                  loading={false}
                  emptyMessage="No results found"
                  numberedRows={true}
                  showPagination={totalPages > 1}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionResults;
