
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import DataTable from '@/components/common/DataTable';

// Interface for camper data structure
interface CamperData {
  name: string;
  school: string;
  district: string;
  level: string;
  year: string;
  achievements?: string;
}

/**
 * Campers page component
 * Purpose: Display paginated list of Rwanda Mathematics Olympiad campers
 * Features: Search functionality, filtering, pagination with max 8 rows per page
 */
const Campers = () => {
  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Constants for pagination
  const ITEMS_PER_PAGE = 8; // Maximum 8 rows per page as requested
  
  // Mock data for campers (in real app, this would come from an API)
  const allCampers: CamperData[] = [
    { name: "Marie Uwimana", school: "Green Hills Academy", district: "Gasabo", level: "Advanced", year: "2024", achievements: "PAMO Bronze Medal" },
    { name: "David Mukamana", school: "Lycée Notre Dame de Cîteaux", district: "Nyarugenge", level: "Intermediate", year: "2024", achievements: "National Champion" },
    { name: "Grace Ingabire", school: "King David Academy", district: "Kicukiro", level: "Advanced", year: "2024", achievements: "Team Captain" },
    { name: "Emmanuel Nkurunziza", school: "Riviera High School", district: "Gasabo", level: "Advanced", year: "2023", achievements: "IMO Participant" },
    { name: "Sarah Uwizeye", school: "Lycée de Kigali", district: "Nyarugenge", level: "Intermediate", year: "2023", achievements: "Regional Winner" },
    { name: "Jean Claude Bizimana", school: "Fawe Girls School", district: "Kicukiro", level: "Advanced", year: "2023", achievements: "Gold Medal" },
    { name: "Aline Mutoni", school: "Gashora Girls Academy", district: "Bugesera", level: "Intermediate", year: "2024", achievements: "Best Problem Solver" },
    { name: "Patrick Nzeyimana", school: "Sonrise High School", district: "Gasabo", level: "Advanced", year: "2022", achievements: "Innovation Award" },
    { name: "Claudine Uwimana", school: "Wellspring Academy", district: "Nyarugenge", level: "Beginner", year: "2024", achievements: "Most Improved" },
    { name: "Felix Habimana", school: "Legacy Christian Academy", district: "Kicukiro", level: "Advanced", year: "2022", achievements: "Excellence Award" },
    { name: "Diane Mukasine", school: "Petit Séminaire Virgo Fidelis", district: "Muhanga", level: "Intermediate", year: "2024", achievements: "Team Spirit Award" },
    { name: "Samuel Uwamahoro", school: "College Christ-Roi", district: "Huye", level: "Advanced", year: "2023", achievements: "Research Excellence" },
    { name: "Ange Mukandayisenga", school: "Groupe Scolaire Officiel de Butare", district: "Huye", level: "Beginner", year: "2024", achievements: "Rising Star" },
    { name: "Christian Niyonkuru", school: "Ecole Secondaire de Nyamirambo", district: "Nyarugenge", level: "Intermediate", year: "2022", achievements: "Dedication Award" },
    { name: "Vestine Uwimana", school: "Lycée Sainte Famille", district: "Muhanga", level: "Advanced", year: "2023", achievements: "Leadership Award" },
    { name: "Pacifique Nzeyimana", school: "Green Park International School", district: "Gasabo", level: "Beginner", year: "2024", achievements: "Newcomer Award" },
    { name: "Ornella Uwamahoro", school: "Academie de la Salle", district: "Kicukiro", level: "Intermediate", year: "2022", achievements: "Perseverance Medal" },
    { name: "Yves Nkundimana", school: "Collège de Gisenyi", district: "Rubavu", level: "Advanced", year: "2023", achievements: "International Recognition" },
    { name: "Clarisse Mukansanga", school: "Lycée Sainte Marie", district: "Musanze", level: "Beginner", year: "2024", achievements: "Rapid Progress Award" },
    { name: "Thierry Uwimana", school: "College Saint Andre", district: "Kigali", level: "Intermediate", year: "2022", achievements: "Teamwork Excellence" }
  ];

  // Filter campers based on search and filter criteria
  const filteredCampers = useMemo(() => {
    return allCampers.filter(camper => {
      const matchesSearch = searchTerm === '' || 
        camper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camper.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camper.district.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || camper.year === selectedYear;
      const matchesLevel = selectedLevel === 'All' || camper.level === selectedLevel;
      
      return matchesSearch && matchesYear && matchesLevel;
    });
  }, [searchTerm, selectedYear, selectedLevel]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCampers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCampers = filteredCampers.slice(startIndex, endIndex);

  // Get unique years and levels for filter options
  const availableYears = ['All', ...Array.from(new Set(allCampers.map(c => c.year))).sort()];
  const availableLevels = ['All', ...Array.from(new Set(allCampers.map(c => c.level)))];

  // Define table columns
  const tableColumns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'school',
      label: 'School',
      render: (value: string) => value
    },
    {
      key: 'district',
      label: 'District',
      render: (value: string) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'level',
      label: 'Level',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Advanced' ? 'bg-red-100 text-red-800' :
          value === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'year',
      label: 'Year',
      render: (value: string) => (
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'achievements',
      label: 'Achievements',
      render: (value: string) => value || '-'
    }
  ];

  /**
   * Handle page changes - resets to page 1 when filters change
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    document.getElementById('campers-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handle filter changes - reset to page 1
   */
  const handleFilterChange = (filterType: 'year' | 'level', value: string) => {
    setCurrentPage(1);
    if (filterType === 'year') {
      setSelectedYear(value);
    } else {
      setSelectedLevel(value);
    }
  };

  /**
   * Handle search changes - reset to page 1
   */
  const handleSearchChange = (value: string) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Mathematics Olympiad Campers
          </h1>
          <p className="text-xl text-gray-600">
            Talented students who participated in our intensive training camps
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Campers
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search by name, school, or district..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCampers.length)} of {filteredCampers.length} campers
            </span>
          </div>
        </div>

        {/* Campers Table */}
        <div id="campers-section" className="bg-white rounded-lg shadow-lg">
          <DataTable
            data={paginatedCampers}
            columns={tableColumns}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredCampers.length}
            loading={false}
            emptyMessage="No campers found matching your criteria"
            numberedRows={true}
            showPagination={true}
            className="p-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Campers;
