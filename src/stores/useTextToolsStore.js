import { create } from 'zustand';
import { 
  getInitialTextToolsData,
  saveTextOperation,
  getRecentTextOperations,
  textProcessors 
} from '../api/textToolsApi.js';

const useTextToolsStore = create((set, get) => ({
  // State
  textTools: null,
  recentOperations: [],
  
  // Initialize with default values
  initialize: () => {
    const initialData = getInitialTextToolsData();
    const recentOps = getRecentTextOperations();
    
    set({ 
      textTools: initialData,
      recentOperations: recentOps
    });
  },
  
  // Update the active tool
  setTool: (tool) => {
    set((state) => ({
      textTools: {
        ...state.textTools,
        tool,
        result: null
      }
    }));
  },
  
  // Update text input
  setText: (text) => {
    set((state) => ({
      textTools: {
        ...state.textTools,
        text
      }
    }));
  },
  
  // Update tool option
  setOption: (toolName, optionValue) => {
    set((state) => ({
      textTools: {
        ...state.textTools,
        options: {
          ...state.textTools.options,
          [toolName]: optionValue
        }
      }
    }));
  },
  
  // Process text based on current tool and options
  processText: () => {
    const { textTools } = get();
    const { tool, text, options } = textTools;
    
    let result;
    
    // Select processor based on active tool
    switch (tool) {
      case 'counter':
        result = textProcessors.counter(text);
        break;
        
      case 'case':
        result = textProcessors.case(text, options.case);
        break;
        
      case 'format':
        result = textProcessors.format(text, options.format);
        break;
        
      case 'lines':
        result = textProcessors.lines(text, options.lines);
        break;
        
      default:
        result = { error: 'Invalid tool selected' };
    }
    
    // Update state with result
    set((state) => ({
      textTools: {
        ...state.textTools,
        result
      }
    }));
    
    // Save to history if successful
    if (!result.error) {
      const operation = {
        tool,
        option: options[tool],
        textSample: text.slice(0, 100) + (text.length > 100 ? '...' : ''),
        result
      };
      
      const savedOperation = saveTextOperation(operation);
      
      if (savedOperation) {
        set((state) => ({
          recentOperations: [savedOperation, ...state.recentOperations].slice(0, 10)
        }));
      }
    }
    
    return result;
  },
  
  // Copy result to input
  copyResultToInput: () => {
    const { textTools } = get();
    
    if (textTools.result && textTools.result.result) {
      set((state) => ({
        textTools: {
          ...state.textTools,
          text: textTools.result.result
        }
      }));
      
      return true;
    }
    
    return false;
  }
}));

export default useTextToolsStore; 