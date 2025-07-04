import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, CheckSquare, Square, FileText, ChevronLeft, ChevronRight, Download, Users } from "lucide-react";
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
  s_date?: string;
  e_date?: string;
  [key: string]: string | undefined;
}

const Campers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampers, setSelectedCampers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const campersPerPage = 10;

  // Fetch campers data from Google Sheets
  const {
    data: campers = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['campers'],
    queryFn: async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1_goCAnx9eFbY_hBHQpUggbWYQKWuKZrUPWP8s8zgpIM/gviz/tq?tqx=out:csv&sheet=CAMP1');
      const csvText = await response.text();
      console.log('Raw CSV data:', csvText);

      // Parse CSV - Split by lines and handle quoted values properly
      const lines = csvText.split('\n').filter(line => line.trim());
      if (lines.length === 0) return [];

      // Parse the header row
      const headerLine = lines[0];
      const headers = headerLine.split(',').map(header => header.replace(/"/g, '').trim());
      console.log('Headers:', headers);
      
      const campersData: Camper[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV parsing - split by comma and remove quotes
        const values = line.split(',').map(value => value.replace(/"/g, '').trim());

        // Create camper object
        const camper: Camper = {
          name: '',
          school: '',
          district: '',
          gender: ''
        };

        // Map the values to our expected fields
        headers.forEach((header, index) => {
          const value = values[index] || '';

          // Map CSV headers to our expected field names
          if (header.toUpperCase().includes('STUDENT NAME') || header.toUpperCase().includes('NAME')) {
            camper.name = value;
          } else if (header.toUpperCase().includes('SCHOOL')) {
            camper.school = value;
          } else if (header.toUpperCase().includes('DISTRICT') && !header.toUpperCase().includes('HOME')) {
            camper.district = value;
          } else if (header.toUpperCase().includes('GENDER')) {
            camper.gender = value;
          } else if (header.toUpperCase().includes('S_DATE')) {
            camper.s_date = value;
          } else if (header.toUpperCase().includes('E_DATE')) {
            camper.e_date = value;
          }

          // Store all fields for potential future use
          camper[header.toLowerCase().replace(/\s+/g, '_')] = value;
        });

        // Only add campers with a name
        if (camper.name && camper.name !== 'NO') {
          campersData.push(camper);
        }
      }
      
      console.log('Parsed campers:', campersData);
      return campersData;
    }
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

    setIsGenerating(true);

    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import('jspdf');
      
      selectedCampers.forEach(camperName => {
        const camper = campers.find(c => c.name === camperName);
        if (!camper) return;

        const doc = new jsPDF();

        // Set consistent margins
        const leftMargin = 20;
        const rightMargin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const contentWidth = pageWidth - leftMargin - rightMargin;

        // Add Rwanda Mathematical Olympiad logo at the top center
        const logoWidth = 100;
        const logoHeight = 20;
        const logoX = (pageWidth - logoWidth) / 2;
        const logoY = 20;

        try {
          doc.addImage('/lovable-uploads/4b9719bb-905e-4daa-b406-6d19562edd83.png', 'PNG', logoX, logoY, logoWidth, logoHeight);
        } catch (error) {
          console.log('Logo image not loaded, continuing without logo');
        }

        // Document title - centered below logo
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        const titleY = logoY + logoHeight + 15;
        doc.text('2025 National Mathematics Summer Camp – AIMS Rwanda', pageWidth / 2, titleY, { align: 'center' });

        const dateY = titleY;

        // Greeting - aligned to left margin
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const greetingY = dateY + 15;
        doc.text(`Hello ${camper.name}`, leftMargin, greetingY);
        doc.text(`Student at ${camper.school},`, leftMargin, greetingY + 7);

        // Body text - respecting margins with proper line wrapping
        const sDate = camper.s_date || '[S_DATE]';
        const eDate = camper.e_date || '[E_DATE]';
        
        const bodyText = [
          'Congratulations on your outstanding performance in the Rwanda Mathematics Competitions, let alone Round 3. You have been selected to attend the 2025 National Mathematics Summer Camp at AIMS Rwanda, thanks to your hard work and exceptional problem-solving skills.',
          '',
          `This year's selection process was highly competitive, and your achievement is truly commendable. We deeply appreciate your efforts and are excited to welcome you among the top math students in the country. This camp will happen at AIMS-Rwanda, Kigali, from ${sDate} to ${eDate}, and the arrival date is ${sDate} by 11:00 AM, Kigali time.`,
          '',
          'At the camp, you will come with one Math notebook and pens, no need for a calculator, bring casual personal and sports clothes, sport materials, any essential medications, and a reusable water bottle.',
          '',
          'We will provide accommodation, meals, training materials, and full support during the camp. Be ready to challenge yourself, work with peers, and grow as a mathematician.',
          '',
          `If you have any questions, feel free to contact Theoneste at theoneste.sanzabarinda@aims.ac.rw or via WhatsApp 0780850611. Every student should confirm their attendance 7 days before ${sDate} by joining the telegram channel called OLYMPIADSUMMERCAMP2025 and fill and sign the form letter that he will find there.`,
          '',
          'We look forward to welcoming you to the Rwanda Olympiad community!'
        ];

        let yPosition = greetingY + 20;
        const lineHeight = 5;

        bodyText.forEach(line => {
          if (line === '') {
            yPosition += lineHeight;
            return;
          }

          const wrappedLines = doc.splitTextToSize(line, contentWidth);
          wrappedLines.forEach((wrappedLine: string) => {
            doc.text(wrappedLine, leftMargin, yPosition);
            yPosition += lineHeight;
          });
        });

        // Closing and signature section
        yPosition += 10;

        // Closing text
        doc.text('Warm regards,', leftMargin, yPosition);
        yPosition += 10;

        // Add signature image aligned to left margin
        const signatureWidth = 45;
        const signatureHeight = 14;
        const signatureY = yPosition;
        
        try {
          doc.addImage('/lovable-uploads/a1bc53f6-4c31-434f-863c-635ccb3dc5ed.png', 'PNG', leftMargin, signatureY, signatureWidth, signatureHeight);
        } catch (error) {
          console.log('Signature image not loaded, continuing without signature');
        }

        // Signer details below signature - aligned to left margin
        const signerDetailsY = signatureY + signatureHeight + 5;
        doc.setFontSize(11);
        const signerDetails = [
          'Obed Nsanzimfura',
          'Rwanda Olympiad Program, Program Manager',
          'African Institute for Mathematical Sciences (AIMS), Rwanda'
        ];
        
        let signerY = signerDetailsY;
        signerDetails.forEach(detail => {
          doc.text(detail, leftMargin, signerY);
          signerY += 5;
        });

        // Footer with contact information - centered at bottom
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        const footerText = [
          'African Institute for Mathematical Sciences (AIMS), Rwanda',
          'Address: KG 3 Ave, Kigali, Rwanda | Website: www.aims.ac.rw | Email: matholympiad@aims.ac.rw'
        ];
        
        let footerY = 270;
        footerText.forEach(line => {
          doc.text(line, pageWidth / 2, footerY, { align: 'center' });
          footerY += 4;
        });

        // Reset text color for next document
        doc.setTextColor(0, 0, 0);

        // Save the PDF
        doc.save(`${camper.name.replace(/\s+/g, '_')}_RMC2025_INVITATION.pdf`);
      });

      alert(`Successfully generated ${selectedCampers.size} invitation letters!`);
    } catch (error) {
      console.error('Error generating PDFs:', error);
      alert('There was an error generating the letters. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate visible page numbers (show max 7 pages)
  const getVisiblePages = () => {
    const maxVisible = 7;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading campers data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="text-center text-red-600 bg-red-50 p-4 sm:p-6 rounded-lg mx-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Error Loading Data</h2>
            <p className="text-sm sm:text-base">Unable to load campers data. Please check your internet connection and try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Rwanda Olympiad Summer Camp 2025
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-600 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{campers.length} Total Campers</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{selectedCampers.size} Selected</span>
            </div>
          </div>
        </div>
        
        {/* Search and Actions */}
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 px-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search campers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 w-full text-sm sm:text-base"
            />
          </div>
          
          <Button
            onClick={generatePDFLetters}
            disabled={selectedCampers.size === 0 || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2.5"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate Letters ({selectedCampers.size})
              </>
            )}
          </Button>
        </div>

        {/* Results Summary */}
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 px-2">
          Showing {currentCampers.length} of {filteredCampers.length} campers
          {searchTerm && ` (filtered from ${campers.length} total)`}
        </div>

        {/* Campers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mx-2">
          <div className="overflow-x-auto">
            <style>{`
              .improved-table {
                border-collapse: collapse;
                width: 100%;
                min-width: 600px;
              }
              .improved-table th {
                background-color: #00A46C;
                color: white;
                padding: 8px 12px;
                text-align: left;
                font-weight: bold;
                font-size: 14px;
                white-space: nowrap;
              }
              .improved-table td {
                padding: 8px 12px;
                border-bottom: 1px solid #ddd;
                font-size: 14px;
              }
              .improved-table tr:nth-child(odd) td {
                background-color: #ffffff;
              }
              .improved-table tr:nth-child(even) td {
                background-color: #f8f9fa;
              }
              .improved-table tr:hover td {
                background-color: #e3f2fd;
              }
              @media (max-width: 640px) {
                .improved-table th,
                .improved-table td {
                  padding: 6px 8px;
                  font-size: 12px;
                }
              }
            `}</style>
            <Table className="improved-table">
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
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        camper.gender === 'Male' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {camper.gender}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 sm:mt-6 flex justify-center px-2">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                  />
                </PaginationItem>
                
                {/* First page if not visible */}
                {visiblePages[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(1)}
                        className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {visiblePages[0] > 2 && (
                      <PaginationItem>
                        <span className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500">...</span>
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Visible page numbers */}
                {visiblePages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Last page if not visible */}
                {visiblePages[visiblePages.length - 1] < totalPages && (
                  <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                      <PaginationItem>
                        <span className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500">...</span>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                        className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
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
