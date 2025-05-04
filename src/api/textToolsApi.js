// Text Tools API
// For storing recent operations in localStorage

// Save a text operation to history
export function saveTextOperation(operation) {
  try {
    // Get existing operations or initialize empty array
    const existingOperations = JSON.parse(localStorage.getItem('textOperations') || '[]');
    
    // Create new operation record with ID and timestamp
    const newOperation = {
      id: `text-op-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...operation
    };
    
    // Add to saved operations
    existingOperations.push(newOperation);
    
    // Save back to localStorage (keep only the last 10)
    localStorage.setItem('textOperations', 
      JSON.stringify(existingOperations.slice(-10)));
    
    return newOperation;
  } catch (error) {
    console.error('Error saving text operation:', error);
    return null;
  }
}

// Get recent text operations
export function getRecentTextOperations() {
  try {
    return JSON.parse(localStorage.getItem('textOperations') || '[]');
  } catch (error) {
    console.error('Error loading text operations:', error);
    return [];
  }
}

// Get initial data for text tools
export function getInitialTextToolsData() {
  return {
    tool: 'counter', // Default tool: counter, case, format, lines
    text: '',
    result: null,
    options: {
      case: 'lower', // lower, upper, title, sentence
      format: 'trim', // trim, removeExtraSpaces, removeLineBreaks, removeSpecialChars, json
      lines: 'removeDuplicates', // removeDuplicates, sortAscending, sortDescending, shuffle
    }
  };
}

// Text processing operations
export const textProcessors = {
  // Counter
  counter: (text) => {
    if (!text) return { error: 'No text provided' };
    
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.trim() ? text.trim().split(/\r\n|\r|\n/).length : 0;
    const paragraphs = text.trim() ? text.trim().split(/\r\n\r\n|\r\r|\n\n/).filter(p => p.trim()).length : 0;
    
    return {
      characters,
      words,
      lines,
      paragraphs,
      textSample: text.slice(0, 100) + (text.length > 100 ? '...' : '')
    };
  },
  
  // Case conversion
  case: (text, option) => {
    if (!text) return { error: 'No text provided' };
    
    let result;
    
    switch (option) {
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'title':
        result = text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      case 'sentence':
        result = text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
        break;
      default:
        return { error: 'Invalid case option' };
    }
    
    return {
      result,
      textSample: result.slice(0, 100) + (result.length > 100 ? '...' : '')
    };
  },
  
  // Text formatting
  format: (text, option) => {
    if (!text) return { error: 'No text provided' };
    
    let result;
    
    switch (option) {
      case 'trim':
        result = text.trim();
        break;
      case 'removeExtraSpaces':
        result = text.replace(/\s+/g, ' ').trim();
        break;
      case 'removeLineBreaks':
        result = text.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ').trim();
        break;
      case 'removeSpecialChars':
        result = text.replace(/[^\w\s]/gi, '');
        break;
      case 'json':
        try {
          // Try to format JSON
          const parsed = JSON.parse(text);
          result = JSON.stringify(parsed, null, 2);
        } catch (e) {
          return { error: 'Invalid JSON format' };
        }
        break;
      default:
        return { error: 'Invalid format option' };
    }
    
    return {
      result,
      textSample: result.slice(0, 100) + (result.length > 100 ? '...' : '')
    };
  },
  
  // Line operations
  lines: (text, option) => {
    if (!text) return { error: 'No text provided' };
    
    // Split into lines
    const lines = text.split(/\r\n|\r|\n/).filter(line => line.trim());
    let result;
    
    switch (option) {
      case 'removeDuplicates':
        result = [...new Set(lines)].join('\n');
        break;
      case 'sortAscending':
        result = [...lines].sort().join('\n');
        break;
      case 'sortDescending':
        result = [...lines].sort().reverse().join('\n');
        break;
      case 'shuffle':
        result = [...lines]
          .map(line => ({ line, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ line }) => line)
          .join('\n');
        break;
      default:
        return { error: 'Invalid line operation option' };
    }
    
    return {
      result,
      textSample: result.slice(0, 100) + (result.length > 100 ? '...' : '')
    };
  }
}; 