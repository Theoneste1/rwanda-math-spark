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
  s_date?: string;
  e_date?: string;
  [key: string]: string | undefined;
}
const Campers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampers, setSelectedCampers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
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
  const filteredCampers = campers.filter(camper => camper.name.toLowerCase().includes(searchTerm.toLowerCase()) || camper.school.toLowerCase().includes(searchTerm.toLowerCase()) || camper.district.toLowerCase().includes(searchTerm.toLowerCase()));

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
    const {
      jsPDF
    } = await import('jspdf');
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
      // Logo dimensions (adjustable)
      const logoWidth = 100;
      const logoHeight = 20;
      const logoX = (pageWidth - logoWidth) / 2; // Center horizontally
      const logoY = 20;
      try {
        doc.addImage('/lovable-uploads/4b9719bb-905e-4daa-b406-6d19562edd83.png', 'PNG', logoX, logoY, logoWidth, logoHeight);
      } catch (error) {
        console.log('Logo image not loaded, continuing without logo');
      }

      // Document title - centered below logo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      const titleY = logoY + logoHeight + 15;
      doc.text('2025 National Mathematics Summer Camp – AIMS Rwanda', pageWidth / 2, titleY, {
        align: 'center'
      });

      // Date - aligned to left margin
      // doc.setFontSize(10);
      // doc.setFont('helvetica', 'normal');
      // const currentDate = new Date().toLocaleDateString();
      // const dateY = titleY + 20;
      // doc.text(`Date: ${currentDate}`, leftMargin, dateY);

      const dateY = titleY + 0;// this just added because I commented above one

      // Greeting - aligned to left margin
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const greetingY = dateY + 15;
      doc.text(`Hello ${camper.name}`, leftMargin, greetingY);
      doc.text(`Student at ${camper.school},`, leftMargin, greetingY + 7);

      // Body text - respecting margins with proper line wrapping
      const sDate = camper.s_date || '[S_DATE]';
      const eDate = camper.e_date || '[E_DATE]';
      const bodyText = ['Congratulations on your outstanding performance in the Rwanda Mathematics Competitions, let alone Round 3. You have been selected to attend the 2025 National Mathematics Summer Camp at AIMS Rwanda, thanks to your hard work and exceptional problem-solving skills.', '', `This year's selection process was highly competitive, and your achievement is truly commendable. We deeply appreciate your efforts and are excited to welcome you among the top math students in the country. This camp will happen at AIMS-Rwanda, Kigali, from ${sDate} to ${eDate}, and the arrival date is ${sDate} by 11:00 AM, Kigali time.`, '', 'At the camp, you will come with one Math notebook and pens, no need for a calculator, bring casual personal and sports clothes, sport materials, any essential medications, and a reusable water bottle.', '', 'We will provide accommodation, meals, training materials, and full support during the camp. Be ready to challenge yourself, work with peers, and grow as a mathematician.', '', `If you have any questions, feel free to contact Theoneste at theoneste.sanzabarinda@aims.ac.rw or via WhatsApp 0780850611. Every student should confirm their attendance 7 days before ${sDate} by joining the telegram channel called OLYMPIADSUMMERCAMP2025 and fill and sign the form letter that he will find there.`, '', 'We look forward to welcoming you to the Rwanda Olympiad community!'];
      let yPosition = greetingY + 20;
      const lineHeight = 5;
      bodyText.forEach(line => {
        if (line === '') {
          yPosition += lineHeight;
          return;
        }

        // Regular paragraph text - justified within margins
        const wrappedLines = doc.splitTextToSize(line, contentWidth);
        wrappedLines.forEach((wrappedLine: string) => {
          doc.text(wrappedLine, leftMargin, yPosition);
          yPosition += lineHeight;
        });
      });

      // Closing and signature section
      yPosition += 10; // Extra space before closing

      // Closing text
      doc.text('Warm regards,', leftMargin, yPosition);
      yPosition += 10;

      // Add signature image aligned to left margin
      const signatureWidth = 45; // 1.5 units (adjustable)
      const signatureHeight = 15; // 0.5 units (adjustable)
      const signatureY = yPosition;
      try {
        doc.addImage('/lovable-uploads/a1bc53f6-4c31-434f-863c-635ccb3dc5ed.png', 'PNG', leftMargin, signatureY, signatureWidth, signatureHeight);
      } catch (error) {
        console.log('Signature image not loaded, continuing without signature');
      }

      // Signer details below signature - aligned to left margin
      const signerDetailsY = signatureY + signatureHeight + 5;
      doc.setFontSize(10);
      const signerDetails = ['Obed Nsanzimfura', 'Rwanda Olympiad Program, Program Manager', 'African Institute for Mathematical Sciences (AIMS), Rwanda'];
      let signerY = signerDetailsY;
      signerDetails.forEach(detail => {
        doc.text(detail, leftMargin, signerY);
        signerY += 5;
      });

      // Footer with contact information - centered at bottom
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128); // Subtle gray color
      const footerText = ['African Institute for Mathematical Sciences (AIMS), Rwanda', 'Address: KG 3 Ave, Kigali, Rwanda | Website: www.aims.ac.rw | Email: matholympiad@aims.ac.rw'];
      let footerY = 270;
      footerText.forEach(line => {
        doc.text(line, pageWidth / 2, footerY, {
          align: 'center'
        });
        footerY += 4;
      });

      // Reset text color for next document
      doc.setTextColor(0, 0, 0);

      // Save the PDF
      doc.save(`${camper.name.replace(/\s+/g, '_')}_RMC2025_INVITATION.pdf`);
    });
    // alert(`Generated ${selectedCampers.size} invitation letters!`);
  };
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">Loading campers data...</div>
        </div>
      </div>;
  }
  if (error) {
    return <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">Error loading campers data. Please try again later.</div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="px-0 text-accent-foreground from-blue-800 text-gray-800 font-medium text-center">RWANDA OLYMPIAD SUMMER CAMP 2025</h1>
        
        {/* Search and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" placeholder="Search campers by name, school, or district..." value={searchTerm} onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }} className="pl-10" />
          </div>
          
          <Button onClick={generatePDFLetters} disabled={selectedCampers.size === 0} className="bg-blue-600 hover:bg-blue-700 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Letters ({selectedCampers.size})
          </Button>
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {currentCampers.length} of {filteredCampers.length} campers
          {searchTerm && ` (filtered from ${campers.length} total)`}
        </div>

        {/* Campers Table with improved styling */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <style>{`
            .improved-table {
              border-collapse: collapse;
              width: 100%;
            }
            .improved-table th {
              background-color: #00A46C;
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
            .improved-table td {
              padding: 10px;
              border-bottom: 1px solid #ddd;
            }
            .improved-table tr:nth-child(odd) td {
              background-color: #ffffff;
            }
            .improved-table tr:nth-child(even) td {
              background-color: #e2f2f2;
            }
            .improved-table tr:hover td {
              background-color: #d4edda;
            }
          `}</style>
          <Table className="improved-table">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={selectedCampers.size === currentCampers.length && currentCampers.length > 0} onCheckedChange={toggleSelectAll} />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>School</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Gender</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCampers.map((camper, index) => <TableRow key={index}>
                  <TableCell>
                    <Checkbox checked={selectedCampers.has(camper.name)} onCheckedChange={() => toggleCamperSelection(camper.name)} />
                  </TableCell>
                  <TableCell className="font-medium">{camper.name}</TableCell>
                  <TableCell>{camper.school}</TableCell>
                  <TableCell>{camper.district}</TableCell>
                  <TableCell>{camper.gender}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => <PaginationItem key={i + 1}>
                    <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1} className="cursor-pointer">
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>)}
                
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>}
      </div>
    </div>;
};
export default Campers;
