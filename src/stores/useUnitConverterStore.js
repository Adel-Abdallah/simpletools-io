import { create } from 'zustand';
import { 
  getInitialUnitConverterData,
  saveConversion,
  getRecentConversions,
  addToFavorites as addToFavoritesApi,
  removeFromFavorites as removeFromFavoritesApi,
  convertUnits,
  unitData
} from '../api/unitConverterApi.js';

const useUnitConverterStore = create((set, get) => ({
  // State
  converter: null,
  recentConversions: [],
  
  // Initialize with default values
  initialize: () => {
    const initialData = getInitialUnitConverterData();
    const recentConvs = getRecentConversions();
    
    set({ 
      converter: initialData,
      recentConversions: recentConvs
    });
  },
  
  // Set the unit category
  setCategory: (category) => {
    set((state) => {
      // Get first two units of the new category
      const units = Object.keys(unitData[category].units);
      
      return {
        converter: {
          ...state.converter,
          category,
          fromUnit: units[0],
          toUnit: units[1],
          result: null
        }
      };
    });
  },
  
  // Set from unit
  setFromUnit: (fromUnit) => {
    set((state) => ({
      converter: {
        ...state.converter,
        fromUnit,
        result: null
      }
    }));
  },
  
  // Set to unit
  setToUnit: (toUnit) => {
    set((state) => ({
      converter: {
        ...state.converter,
        toUnit,
        result: null
      }
    }));
  },
  
  // Set from value
  setFromValue: (fromValue) => {
    set((state) => ({
      converter: {
        ...state.converter,
        fromValue,
        result: null
      }
    }));
  },
  
  // Swap units
  swapUnits: () => {
    set((state) => ({
      converter: {
        ...state.converter,
        fromUnit: state.converter.toUnit,
        toUnit: state.converter.fromUnit,
        result: null
      }
    }));
  },
  
  // Perform conversion
  convert: () => {
    const { converter } = get();
    const { category, fromUnit, toUnit, fromValue } = converter;
    
    // Perform conversion
    const result = convertUnits(category, fromUnit, toUnit, fromValue);
    
    // Update state with result
    set((state) => ({
      converter: {
        ...state.converter,
        result
      }
    }));
    
    // Save to history if no error
    if (!result.error) {
      const savedConversion = saveConversion(result);
      
      if (savedConversion) {
        set((state) => ({
          recentConversions: [savedConversion, ...state.recentConversions].slice(0, 10)
        }));
      }
    }
    
    return result;
  },
  
  // Add current conversion to favorites
  addToFavorites: () => {
    const { converter } = get();
    const { result } = converter;
    
    if (result && !result.error) {
      const favorites = addToFavoritesApi(result);
      
      set((state) => ({
        converter: {
          ...state.converter,
          favorites
        }
      }));
      
      return true;
    }
    
    return false;
  },
  
  // Remove conversion from favorites
  removeFromFavorites: (id) => {
    const favorites = removeFromFavoritesApi(id);
    
    set((state) => ({
      converter: {
        ...state.converter,
        favorites
      }
    }));
    
    return favorites;
  },
  
  // Use a favorite conversion
  useFavorite: (favorite) => {
    set((state) => ({
      converter: {
        ...state.converter,
        category: favorite.category,
        fromUnit: favorite.fromUnit,
        toUnit: favorite.toUnit,
        fromValue: 1, // Reset value
        result: null
      }
    }));
  },
  
  // Clear recent conversions
  clearRecentConversions: () => {
    localStorage.removeItem('conversions');
    
    set({
      recentConversions: []
    });
  }
}));

export default useUnitConverterStore; 