// Unit Converter API
// For unit conversion calculations and history storage

// Save a conversion to history
export function saveConversion(conversion) {
  try {
    // Get existing conversions or initialize empty array
    const existingConversions = JSON.parse(localStorage.getItem('conversions') || '[]');
    
    // Create new conversion record with ID and timestamp
    const newConversion = {
      id: `conv-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...conversion
    };
    
    // Add to saved conversions
    existingConversions.push(newConversion);
    
    // Save back to localStorage (keep only the last 10)
    localStorage.setItem('conversions', 
      JSON.stringify(existingConversions.slice(-10)));
    
    return newConversion;
  } catch (error) {
    console.error('Error saving conversion:', error);
    return null;
  }
}

// Get recent conversions
export function getRecentConversions() {
  try {
    return JSON.parse(localStorage.getItem('conversions') || '[]');
  } catch (error) {
    console.error('Error loading conversions:', error);
    return [];
  }
}

// Get initial data for unit converter
export function getInitialUnitConverterData() {
  return {
    category: 'length',
    fromUnit: 'm',
    toUnit: 'km',
    fromValue: 1,
    result: null,
    favorite: localStorage.getItem('favoriteConversions') 
      ? JSON.parse(localStorage.getItem('favoriteConversions')) 
      : []
  };
}

// Add to favorites
export function addToFavorites(conversion) {
  try {
    // Get existing favorites or initialize empty array
    const favorites = JSON.parse(localStorage.getItem('favoriteConversions') || '[]');
    
    // Check if already exists
    const exists = favorites.some(fav => 
      fav.category === conversion.category && 
      fav.fromUnit === conversion.fromUnit && 
      fav.toUnit === conversion.toUnit
    );
    
    if (!exists) {
      // Add to favorites with ID
      const newFavorite = {
        id: `fav-${Date.now()}`,
        ...conversion
      };
      
      favorites.push(newFavorite);
      
      // Save back to localStorage
      localStorage.setItem('favoriteConversions', JSON.stringify(favorites));
      
      return favorites;
    }
    
    return favorites;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return [];
  }
}

// Remove from favorites
export function removeFromFavorites(id) {
  try {
    // Get existing favorites
    const favorites = JSON.parse(localStorage.getItem('favoriteConversions') || '[]');
    
    // Filter out the one to remove
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    
    // Save back to localStorage
    localStorage.setItem('favoriteConversions', JSON.stringify(updatedFavorites));
    
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return [];
  }
}

// Unit conversion data
export const unitData = {
  // Length units
  length: {
    name: 'Length',
    base: 'm', // base unit: meters
    units: {
      km: { name: 'Kilometers', factor: 0.001 },
      m: { name: 'Meters', factor: 1 },
      cm: { name: 'Centimeters', factor: 100 },
      mm: { name: 'Millimeters', factor: 1000 },
      mi: { name: 'Miles', factor: 0.000621371 },
      yd: { name: 'Yards', factor: 1.09361 },
      ft: { name: 'Feet', factor: 3.28084 },
      in: { name: 'Inches', factor: 39.3701 }
    }
  },
  
  // Weight/Mass units
  weight: {
    name: 'Weight',
    base: 'kg', // base unit: kilograms
    units: {
      t: { name: 'Metric Tons', factor: 0.001 },
      kg: { name: 'Kilograms', factor: 1 },
      g: { name: 'Grams', factor: 1000 },
      mg: { name: 'Milligrams', factor: 1000000 },
      lb: { name: 'Pounds', factor: 2.20462 },
      oz: { name: 'Ounces', factor: 35.274 }
    }
  },
  
  // Temperature units (special case: requires offset for some conversions)
  temperature: {
    name: 'Temperature',
    base: 'c', // base unit: Celsius
    units: {
      c: { name: 'Celsius', factor: 1, offset: 0 },
      f: { name: 'Fahrenheit', factor: 9/5, offset: 32 },
      k: { name: 'Kelvin', factor: 1, offset: 273.15 }
    }
  },
  
  // Area units
  area: {
    name: 'Area',
    base: 'm2', // base unit: square meters
    units: {
      km2: { name: 'Square Kilometers', factor: 0.000001 },
      m2: { name: 'Square Meters', factor: 1 },
      cm2: { name: 'Square Centimeters', factor: 10000 },
      mm2: { name: 'Square Millimeters', factor: 1000000 },
      ha: { name: 'Hectares', factor: 0.0001 },
      acre: { name: 'Acres', factor: 0.000247105 },
      ft2: { name: 'Square Feet', factor: 10.7639 },
      in2: { name: 'Square Inches', factor: 1550 }
    }
  },
  
  // Volume units
  volume: {
    name: 'Volume',
    base: 'l', // base unit: liters
    units: {
      m3: { name: 'Cubic Meters', factor: 0.001 },
      l: { name: 'Liters', factor: 1 },
      ml: { name: 'Milliliters', factor: 1000 },
      gal: { name: 'Gallons (US)', factor: 0.264172 },
      qt: { name: 'Quarts (US)', factor: 1.05669 },
      pt: { name: 'Pints (US)', factor: 2.11338 },
      cup: { name: 'Cups (US)', factor: 4.22675 },
      fl_oz: { name: 'Fluid Ounces (US)', factor: 33.814 }
    }
  },
  
  // Speed units
  speed: {
    name: 'Speed',
    base: 'mps', // base unit: meters per second
    units: {
      mps: { name: 'Meters per second', factor: 1 },
      kph: { name: 'Kilometers per hour', factor: 3.6 },
      mph: { name: 'Miles per hour', factor: 2.23694 },
      fps: { name: 'Feet per second', factor: 3.28084 },
      knot: { name: 'Knots', factor: 1.94384 }
    }
  },
  
  // Time units
  time: {
    name: 'Time',
    base: 's', // base unit: seconds
    units: {
      yr: { name: 'Years', factor: 1/(365.25*24*60*60) },
      mo: { name: 'Months (avg)', factor: 1/(30.4375*24*60*60) },
      wk: { name: 'Weeks', factor: 1/(7*24*60*60) },
      d: { name: 'Days', factor: 1/(24*60*60) },
      h: { name: 'Hours', factor: 1/3600 },
      min: { name: 'Minutes', factor: 1/60 },
      s: { name: 'Seconds', factor: 1 },
      ms: { name: 'Milliseconds', factor: 1000 }
    }
  }
};

// Convert between units
export function convertUnits(category, fromUnit, toUnit, value) {
  // Validate inputs
  if (!unitData[category]) {
    return { error: 'Invalid category' };
  }
  
  if (!unitData[category].units[fromUnit] || !unitData[category].units[toUnit]) {
    return { error: 'Invalid unit' };
  }
  
  if (isNaN(parseFloat(value))) {
    return { error: 'Invalid value' };
  }
  
  // Special handling for temperature
  if (category === 'temperature') {
    let result;
    
    // First convert to Celsius (base unit)
    let celsius;
    if (fromUnit === 'c') {
      celsius = value;
    } else if (fromUnit === 'f') {
      celsius = (value - 32) * 5/9;
    } else if (fromUnit === 'k') {
      celsius = value - 273.15;
    }
    
    // Then convert from Celsius to target unit
    if (toUnit === 'c') {
      result = celsius;
    } else if (toUnit === 'f') {
      result = celsius * 9/5 + 32;
    } else if (toUnit === 'k') {
      result = celsius + 273.15;
    }
    
    return {
      category,
      fromUnit,
      toUnit,
      fromValue: parseFloat(value),
      toValue: parseFloat(result.toFixed(6)),
      fromUnitName: unitData[category].units[fromUnit].name,
      toUnitName: unitData[category].units[toUnit].name
    };
  }
  
  // For other unit types, use conversion factors
  const categoryData = unitData[category];
  const baseUnit = categoryData.base;
  
  // Convert from input unit to base unit
  const valueInBaseUnit = fromUnit === baseUnit 
    ? parseFloat(value)
    : parseFloat(value) / categoryData.units[fromUnit].factor;
  
  // Convert from base unit to target unit
  const result = toUnit === baseUnit 
    ? valueInBaseUnit
    : valueInBaseUnit * categoryData.units[toUnit].factor;
  
  return {
    category,
    fromUnit,
    toUnit,
    fromValue: parseFloat(value),
    toValue: parseFloat(result.toFixed(6)),
    fromUnitName: categoryData.units[fromUnit].name,
    toUnitName: categoryData.units[toUnit].name
  };
} 