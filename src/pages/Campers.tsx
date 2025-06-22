
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, CheckSquare, Square, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Camper {
  name: string;
  school: string;
  district: string;
  gender: string;
  [key: string]: string;
}

const Campers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampers, setSelectedCampers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const campersPerPage = 10;

  // Fetch campers data from Google Sheets
  const { data: campers = [], isLoading, error } = useQuery({
    queryKey: ['campers'],
    queryFn: async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1_goCAnx9eFbY_hBHQpUggbWYQKWuKZrUPWP8s8zgpIM/gviz/tq?tqx=out:csv&sheet=CAMP1');
      const csvText = await response.text();
      
      // Parse CSV
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
      
      const campersData: Camper[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(value => value.replace(/"/g, '').trim());
          const camper: Camper = {
            name: '',
            school: '',
            district: '',
            gender: ''
          };
          
          headers.forEach((header, index) => {
            camper[header.toLowerCase()] = values[index] || '';
          });
          
          if (camper.name) {
            campersData.push(camper);
          }
        }
      }
      
      return campersData;
    },
  });

  // Filter campers based on search term
  const filteredCampers = campers.filter(camper =>
    camper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camper.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camper.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCampers.length / campersPerPage);
  const startIndex = (currentPage - 1) * campersPerPage;
  const currentCampers = filteredCampers.slice(startIndex, startIndex + campersPerPage);

  // Handle checkbox selection
  const toggleCamperSelection = (camperName: string) => {
    const newSelected = new Set(selectedCampers);
    if (newSelected.has(camperName)) {
      newSelected.delete(camperName);
    } else {
      newSelected.add(camperName);
    }
    setSelectedCampers(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedCampers.size === currentCampers.length) {
      setSelectedCampers(new Set());
    } else {
      setSelectedCampers(new Set(currentCampers.map(camper => camper.name)));
    }
  };

  const generatePDFLetters = async () => {
    if (selectedCampers.size === 0) {
      alert('Please select at least one camper to generate letters.');
      return;
    }

    // Import jsPDF dynamically
    const { jsPDF } = await import('jspdf');
    
    selectedCampers.forEach(camperName => {
      const camper = campers.find(c => c.name === camperName);
      if (!camper) return;

      const doc = new jsPDF();
      
      // Set up fonts and styles
      doc.setFont('helvetica');
      
      // Header - Logo placeholder
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('RWANDA MATHEMATICS OLYMPIAD', 105, 30, { align: 'center' });
      
      // Title
      doc.setFontSize(14);
      doc.text('CAMP INVITATION LETTER', 105, 45, { align: 'center' });
      
      // Date
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const currentDate = new Date().toLocaleDateString();
      doc.text(`Date: ${currentDate}`, 20, 65);
      
      // Greeting
      doc.setFontSize(12);
      doc.text(`Dear ${camper.name},`, 20, 80);
      
      // Body text
      const bodyText = [
        'Congratulations! You have been selected to participate in the Rwanda Mathematics',
        'Olympiad Training Camp 2025. This is a prestigious opportunity to enhance your',
        'mathematical skills and represent Rwanda in international competitions.',
        '',
        'Camp Details:',
        '• Duration: 2 weeks intensive training',
        '• Location: To be confirmed',
        '• Activities: Advanced problem solving, competition preparation',
        '• Accommodation and meals provided',
        '',
        'Please confirm your attendance by responding to this invitation.',
        'We look forward to seeing you at the camp.',
        '',
        'Best regards,',
        '',
        'Rwanda Mathematics Olympiad Team'
      ];
      
      let yPosition = 95;
      bodyText.forEach(line => {
        if (line.startsWith('•')) {
          doc.text(line, 25, yPosition);
        } else {
          doc.text(line, 20, yPosition);
        }
        yPosition += 6;
      });
      
      // Footer
      doc.setFontSize(8);
      doc.text('Rwanda Mathematics Olympiad | Page 1', 105, 280, { align: 'center' });
      
      // Save the PDF
      doc.save(`${camper.name.replace(/\s+/g, '_')}_RMC2025_INVITATION.pdf`);
    });
    
    alert(`Generated ${selectedCampers.size} invitation letters!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">Loading campers data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">Error loading campers data. Please try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Campers</h1>
        
        {/* Search and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search campers by name, school, or district..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="pl-10"
            />
          </div>
          
          <Button
            onClick={generatePDFLetters}
            disabled={selectedCampers.size === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Letters ({selectedCampers.size})
          </Button>
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {currentCampers.length} of {filteredCampers.length} campers
          {searchTerm && ` (filtered from ${campers.length} total)`}
        </div>

        {/* Campers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedCampers.size === currentCampers.length && currentCampers.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>School</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Gender</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCampers.map((camper, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCampers.has(camper.name)}
                      onCheckedChange={() => toggleCamperSelection(camper.name)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{camper.name}</TableCell>
                  <TableCell>{camper.school}</TableCell>
                  <TableCell>{camper.district}</TableCell>
                  <TableCell>{camper.gender}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campers;
