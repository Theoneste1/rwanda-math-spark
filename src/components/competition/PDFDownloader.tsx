
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
 * Purpose: Create clean, formatted PDF reports of student competition results
 */
const PDFDownloader: React.FC<PDFDownloaderProps> = ({
  results,
  schoolInfo,
  className = ""
}) => {
  /**
   * Generates and downloads PDF report of competition results
   * Creates a well-formatted PDF with header, school info, and results table
   */
  const downloadPDF = () => {
    try {
      // Initialize jsPDF with A4 page size
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // PDF Header
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Rwanda Mathematics Olympiad', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.text(`JRMC2025 ${schoolInfo.round} Results`, pageWidth / 2, 30, { align: 'center' });
      
      // School Information Section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      const schoolInfoY = 50;
      doc.text(`School: ${schoolInfo.schoolName}`, 20, schoolInfoY);
      doc.text(`Teacher: ${schoolInfo.teacherName}`, 20, schoolInfoY + 10);
      doc.text(`Number of Students: ${schoolInfo.numberOfStudents}`, 20, schoolInfoY + 20);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, schoolInfoY + 30);
      
      // Results Table Header
      const tableStartY = schoolInfoY + 50;
      doc.setFont('helvetica', 'bold');
      doc.text('#', 20, tableStartY);
      doc.text('Student Name', 35, tableStartY);
      doc.text('Gender', 100, tableStartY);
      doc.text('Level', 130, tableStartY);
      doc.text('Grade', 155, tableStartY);
      doc.text('Decision', 175, tableStartY);
      
      // Draw header line
      doc.line(20, tableStartY + 3, pageWidth - 20, tableStartY + 3);
      
      // Results Table Data
      doc.setFont('helvetica', 'normal');
      results.forEach((result, index) => {
        const rowY = tableStartY + 15 + (index * 10);
        
        // Check if we need a new page
        if (rowY > 270) {
          doc.addPage();
          // Repeat header on new page
          doc.setFont('helvetica', 'bold');
          doc.text('#', 20, 30);
          doc.text('Student Name', 35, 30);
          doc.text('Gender', 100, 30);
          doc.text('Level', 130, 30);
          doc.text('Grade', 155, 30);
          doc.text('Decision', 175, 30);
          doc.line(20, 33, pageWidth - 20, 33);
          doc.setFont('helvetica', 'normal');
        }
        
        const currentY = rowY > 270 ? 45 + ((rowY - 285) % 250) : rowY;
        
        doc.text((index + 1).toString(), 20, currentY);
        doc.text(result['Student Name'] || '', 35, currentY);
        doc.text(result['Gender'] || '', 100, currentY);
        doc.text(result['Level'] || '', 130, currentY);
        doc.text(result['Grade'] || '', 155, currentY);
        doc.text(result['Decision'] || '', 175, currentY);
      });
      
      // Footer - Fixed the method call here
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `Page ${i} of ${totalPages}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
      
      // Download the PDF
      const fileName = `JRMC2025_${schoolInfo.round}_${schoolInfo.schoolName.replace(/\s+/g, '_')}.pdf`;
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
      aria-label="Download results as PDF"
    >
      <Download className="w-4 h-4 mr-2" />
      Download PDF
    </button>
  );
};

export default PDFDownloader;
