// Date Calculator API
// For now, using localStorage for persistence

// Save a date calculation to localStorage
export function saveDateCalculation(calculation) {
  try {
    // Get existing calculations or initialize empty array
    const existingCalculations = JSON.parse(localStorage.getItem('dateCalculations') || '[]');
    
    // Add new calculation with ID and timestamp
    const newCalculation = {
      id: `calc-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...calculation
    };
    
    // Add to saved calculations
    existingCalculations.push(newCalculation);
    
    // Save back to localStorage (keep only the last 20)
    localStorage.setItem('dateCalculations', 
      JSON.stringify(existingCalculations.slice(-20)));
    
    return newCalculation;
  } catch (error) {
    console.error('Error saving date calculation:', error);
    return null;
  }
}

// Get all saved date calculations
export function getDateCalculations() {
  try {
    return JSON.parse(localStorage.getItem('dateCalculations') || '[]');
  } catch (error) {
    console.error('Error loading date calculations:', error);
    return [];
  }
}

// Get initial data for the date calculator
export function getInitialDateCalculatorData() {
  return {
    mode: 'difference', // difference, add, subtract, countdown
    date1: new Date().toISOString().split('T')[0],
    date2: new Date().toISOString().split('T')[0],
    days: 0,
    result: null,
    includeEndDate: false,
    countdownName: 'My Countdown',
  };
}

// Generate shareable countdown URL
export function generateCountdownShareableLink(countdownData) {
  const baseUrl = window.location.origin;
  const params = new URLSearchParams({
    mode: 'countdown',
    date: countdownData.date,
    name: countdownData.name,
  }).toString();
  
  return `${baseUrl}/date-calculator?${params}`;
}

// Parse URL parameters for countdown
export function parseUrlParameters() {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('mode') && params.get('mode') === 'countdown') {
    return {
      mode: 'countdown',
      date: params.get('date') || new Date().toISOString().split('T')[0],
      name: params.get('name') || 'Countdown',
    };
  }
  
  return null;
} 