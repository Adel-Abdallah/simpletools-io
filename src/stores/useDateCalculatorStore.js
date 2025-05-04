import { create } from 'zustand';
import { 
  getInitialDateCalculatorData,
  saveDateCalculation,
  parseUrlParameters
} from '../api/dateCalculatorApi.js';

// Date calculation helper functions
const dateFunctions = {
  // Calculate difference between two dates in days
  calculateDifference: (date1, date2, includeEndDate = false) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Ensure dates are valid
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return { error: 'Invalid date(s)' };
    }
    
    // Calculate difference in milliseconds
    const diffTime = Math.abs(d2 - d1);
    
    // Convert to days
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Include end date if specified (add 1 day)
    if (includeEndDate) {
      diffDays += 1;
    }
    
    return {
      days: diffDays,
      startDate: d1 < d2 ? date1 : date2,
      endDate: d1 < d2 ? date2 : date1,
      text: `${diffDays} day${diffDays === 1 ? '' : 's'}`
    };
  },
  
  // Add days to a date
  addDays: (date, days) => {
    const d = new Date(date);
    
    // Ensure date is valid
    if (isNaN(d.getTime())) {
      return { error: 'Invalid date' };
    }
    
    // Add days
    d.setDate(d.getDate() + parseInt(days, 10));
    
    return {
      resultDate: d.toISOString().split('T')[0],
      text: `${days} day${days === 1 ? '' : 's'} after ${date} is ${d.toISOString().split('T')[0]}`
    };
  },
  
  // Subtract days from a date
  subtractDays: (date, days) => {
    const d = new Date(date);
    
    // Ensure date is valid
    if (isNaN(d.getTime())) {
      return { error: 'Invalid date' };
    }
    
    // Subtract days
    d.setDate(d.getDate() - parseInt(days, 10));
    
    return {
      resultDate: d.toISOString().split('T')[0],
      text: `${days} day${days === 1 ? '' : 's'} before ${date} is ${d.toISOString().split('T')[0]}`
    };
  },
  
  // Calculate countdown to a date
  calculateCountdown: (targetDate, name = 'Countdown') => {
    const now = new Date();
    const target = new Date(targetDate);
    
    // Ensure date is valid
    if (isNaN(target.getTime())) {
      return { error: 'Invalid date' };
    }
    
    // Calculate difference in milliseconds
    const diffTime = target - now;
    
    // Check if countdown date is in the past
    if (diffTime < 0) {
      return {
        name,
        targetDate,
        isPast: true,
        days: Math.floor(Math.abs(diffTime) / (1000 * 60 * 60 * 24)),
        text: `${name} was ${Math.floor(Math.abs(diffTime) / (1000 * 60 * 60 * 24))} days ago`
      };
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      name,
      targetDate,
      isPast: false,
      days,
      hours,
      minutes,
      text: `${days} day${days === 1 ? '' : 's'}, ${hours} hour${hours === 1 ? '' : 's'}, ${minutes} minute${minutes === 1 ? '' : 's'}`
    };
  }
};

// Create the store
const useDateCalculatorStore = create((set, get) => ({
  // State
  calculator: null,
  recentCalculations: [],
  
  // Initialize calculator with default values or from URL parameters
  initialize: () => {
    // Check for URL parameters (for shared countdowns)
    const urlParams = parseUrlParameters();
    
    if (urlParams && urlParams.mode === 'countdown') {
      // Initialize with countdown from URL
      const initialData = {
        ...getInitialDateCalculatorData(),
        mode: 'countdown',
        date1: urlParams.date,
        countdownName: urlParams.name,
      };
      
      // Calculate result
      const result = dateFunctions.calculateCountdown(urlParams.date, urlParams.name);
      
      set({ 
        calculator: {
          ...initialData,
          result
        }
      });
    } else {
      // Initialize with default values
      set({ calculator: getInitialDateCalculatorData() });
    }
  },
  
  // Update calculator mode
  setMode: (mode) => {
    set((state) => {
      // Reset result when changing modes
      return {
        calculator: {
          ...state.calculator,
          mode,
          result: null
        }
      };
    });
  },
  
  // Update date values
  setDate: (dateField, value) => {
    set((state) => ({
      calculator: {
        ...state.calculator,
        [dateField]: value
      }
    }));
  },
  
  // Update days value
  setDays: (days) => {
    set((state) => ({
      calculator: {
        ...state.calculator,
        days: parseInt(days, 10) || 0
      }
    }));
  },
  
  // Toggle include end date option
  toggleIncludeEndDate: () => {
    set((state) => ({
      calculator: {
        ...state.calculator,
        includeEndDate: !state.calculator.includeEndDate
      }
    }));
  },
  
  // Update countdown name
  setCountdownName: (name) => {
    set((state) => ({
      calculator: {
        ...state.calculator,
        countdownName: name
      }
    }));
  },
  
  // Calculate result based on current mode
  calculate: () => {
    const { calculator } = get();
    let result;
    
    switch (calculator.mode) {
      case 'difference':
        result = dateFunctions.calculateDifference(
          calculator.date1, 
          calculator.date2,
          calculator.includeEndDate
        );
        break;
        
      case 'add':
        result = dateFunctions.addDays(calculator.date1, calculator.days);
        break;
        
      case 'subtract':
        result = dateFunctions.subtractDays(calculator.date1, calculator.days);
        break;
        
      case 'countdown':
        result = dateFunctions.calculateCountdown(calculator.date1, calculator.countdownName);
        break;
        
      default:
        result = { error: 'Invalid calculation mode' };
    }
    
    // Save calculation to store
    set((state) => ({
      calculator: {
        ...state.calculator,
        result
      }
    }));
    
    // Save to history if there's no error
    if (!result.error) {
      const savedCalculation = saveDateCalculation({
        mode: calculator.mode,
        date1: calculator.date1,
        date2: calculator.date2,
        days: calculator.days,
        includeEndDate: calculator.includeEndDate,
        countdownName: calculator.countdownName,
        result
      });
      
      if (savedCalculation) {
        set((state) => ({
          recentCalculations: [savedCalculation, ...state.recentCalculations].slice(0, 5)
        }));
      }
    }
    
    return result;
  }
}));

export default useDateCalculatorStore; 