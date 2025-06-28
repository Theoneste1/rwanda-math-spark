
// Google Sheets API utility for fetching competition results
// Purpose: Handle data fetching from Google Sheets without using complex includes

/**
 * Fetches data from a specific Google Sheet tab
 * @param sheetId - The Google Sheet ID
 * @param tabName - The specific tab/sheet name to fetch from
 * @returns Promise with the fetched data
 */
export const fetchSheetData = async (sheetId: string, tabName: string) => {
  try {
    // Construct the CSV export URL for the specific sheet tab
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${tabName}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSVData(csvText);
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
};

/**
 * Parses CSV text data into structured format
 * @param csvText - Raw CSV text from Google Sheets
 * @returns Array of objects representing the data
 */
const parseCSVData = (csvText: string) => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  // Parse header row (remove quotes and split by comma)
  const headers = lines[0].split(',').map(header => 
    header.replace(/"/g, '').trim()
  );
  
  // Parse data rows
  const data = lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    return row;
  });
  
  return data;
};

/**
 * Parses a single CSV line handling quoted values with commas
 * @param line - Single CSV line
 * @returns Array of parsed values
 */
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

/**
 * Filters competition results by school code using exact matching
 * @param data - Array of result objects
 * @param schoolCode - School code to filter by (e.g., "GS123")
 * @returns Filtered results for the specific school
 */
export const filterResultsBySchoolCode = (data: any[], schoolCode: string) => {
  if (!data || data.length === 0) return [];
  
  // Use exact matching (EQUAL TO logic) to avoid incorrect data
  return data.filter(row => {
    const rowSchoolCode = row['School Code'] || row['school_code'] || '';
    return rowSchoolCode.toString().toUpperCase() === schoolCode.toUpperCase();
  });
};
