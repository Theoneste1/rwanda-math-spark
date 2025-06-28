
import React from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';

// Interface for competition result data
interface ResultData {
  'Student Name': string;
  'Gender': string;
  'Level': string;
  'Grade': string;
  'Decision': string;
}

// Interface for school information
interface SchoolInfo {
  schoolName: string;
  numberOfStudents: number;
  teacherName: string;
  round: string;
}

// Props interface for PDFDownloader component
interface PDFDownloaderProps {
  results: ResultData[];
  schoolInfo: SchoolInfo;
  className?: string;
}

/**
 * PDFDownloader component for generating and downloading competition results as PDF
 * Purpose: Create clean, formatted PDF reports of student competition results with enhanced styling
 */
const PDFDownloader: React.FC<PDFDownloaderProps> = ({
  results,
  schoolInfo,
  className = ""
}) => {
  /**
   * Generates and downloads PDF report of competition results
   * Creates a well-formatted PDF with header, school info, and results table
   * Now includes ALL results across all pages with enhanced styling
   */
  const downloadPDF = () => {
    try {
      // Initialize jsPDF with A4 page size
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      let currentY = 20;
      
      // PDF Header with colored background
      doc.setFillColor(41, 128, 185); // Blue
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255); // White
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Rwanda Mathematics Olympiad', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text(`JRMC2025 ${schoolInfo.round} Results`, pageWidth / 2, 32, { align: 'center' });
      
      currentY = 60;
      
      // School Information Section with colored background
      doc.setFillColor(236, 240, 241); // Light gray
      doc.rect(20, currentY - 10, pageWidth - 40, 40, 'F');
      
      doc.setTextColor(44, 62, 80); // Dark gray
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('School Information', 25, currentY);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`School: ${schoolInfo.schoolName}`, 25, currentY + 12);
      doc.text(`Teacher: ${schoolInfo.teacherName}`, 25, currentY + 24);
      
      doc.text(`Number of Students: ${schoolInfo.numberOfStudents}`, pageWidth / 2 + 20, currentY + 12);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2 + 20, currentY + 24);
      
      currentY += 60;
      
      // Results Table Header with colored styling
      const tableStartY = currentY;
      const rowHeight = 12;
      const headerHeight = 15;
      
      // Header background
      doc.setFillColor(52, 152, 219); // Light blue
      doc.rect(20, tableStartY - 5, pageWidth - 40, headerHeight, 'F');
      
      // Header text
      doc.setTextColor(255, 255, 255); // White
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('#', 25, tableStartY + 5);
      doc.text('Student Name', 40, tableStartY + 5);
      doc.text('Gender', 105, tableStartY + 5);
      doc.text('Level', 130, tableStartY + 5);
      doc.text('Grade', 155, tableStartY + 5);
      doc.text('Decision', 175, tableStartY + 5);
      
      currentY = tableStartY + headerHeight + 5;
      
      // Results Table Data with alternating row colors
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      results.forEach((result, index) => {
        // Check if we need a new page
        if (currentY > pageHeight - 30) {
          doc.addPage();
          currentY = 30;
          
          // Repeat header on new page
          doc.setFillColor(52, 152, 219); // Light blue
          doc.rect(20, currentY - 5, pageWidth - 40, headerHeight, 'F');
          
          doc.setTextColor(255, 255, 255); // White
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text('#', 25, currentY + 5);
          doc.text('Student Name', 40, currentY + 5);
          doc.text('Gender', 105, currentY + 5);
          doc.text('Level', 130, currentY + 5);
          doc.text('Grade', 155, currentY + 5);
          doc.text('Decision', 175, currentY + 5);
          
          currentY += headerHeight + 5;
        }
        
        // Alternating row backgrounds
        if (index % 2 === 0) {
          doc.setFillColor(236, 240, 241); // Light gray
          doc.rect(20, currentY - 3, pageWidth - 40, rowHeight, 'F');
        }
        
        // Row text color based on decision
        const decision = result['Decision'] || '';
        if (decision.toLowerCase().includes('qualified')) {
          doc.setTextColor(39, 174, 96); // Green
        } else if (decision.toLowerCase().includes('not')) {
          doc.setTextColor(231, 76, 60); // Red
        } else {
          doc.setTextColor(44, 62, 80); // Dark gray
        }
        
        doc.text((index + 1).toString(), 25, currentY + 5);
        doc.setTextColor(44, 62, 80); // Dark gray
        doc.text(result['Student Name'] || '', 40, currentY + 5);
        doc.text(result['Gender'] || '', 105, currentY + 5);
        doc.text(result['Level'] || '', 130, currentY + 5);
        doc.text(result['Grade'] || '', 155, currentY + 5);
        
        // Decision with color coding
        if (decision.toLowerCase().includes('qualified')) {
          doc.setTextColor(39, 174, 96); // Green
        } else if (decision.toLowerCase().includes('not')) {
          doc.setTextColor(231, 76, 60); // Red
        } else {
          doc.setTextColor(44, 62, 80); // Dark gray
        }
        doc.text(decision, 175, currentY + 5);
        
        currentY += rowHeight;
      });
      
      // Footer with colored background
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Footer background
        doc.setFillColor(41, 128, 185); // Blue
        doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
        
        doc.setTextColor(255, 255, 255); // White
        doc.setFontSize(10);
        doc.text(
          `Page ${i} of ${totalPages} | ${schoolInfo.schoolName} - ${schoolInfo.round}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }
      
      // Download the PDF
      const fileName = `JRMC2025_${schoolInfo.round}_${schoolInfo.schoolName.replace(/\s+/g, '_')}_All_Results.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={downloadPDF}
      className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${className}`}
      aria-label="Download all results as PDF"
    >
      <Download className="w-4 h-4 mr-2" />
      Download All Results PDF
    </button>
  );
};

export default PDFDownloader;
