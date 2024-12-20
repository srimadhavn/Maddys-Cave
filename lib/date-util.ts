export function formatArchiveDate(dateString: string): string {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return `${year}-${month}`;
  }
  
  export function formatMonthYear(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('default', { 
      month: 'long',
      year: 'numeric'
    });
  }