import React, { useEffect } from 'react';
import useUnitConverterStore from '../../stores/useUnitConverterStore.js';
import { unitData } from '../../api/unitConverterApi.js';

const UnitConverter = () => {
  // Get unit converter data and functions from the store
  const {
    converter,
    recentConversions,
    initialize,
    setCategory,
    setFromUnit,
    setToUnit,
    setFromValue,
    swapUnits,
    convert,
    addToFavorites,
    removeFromFavorites,
    useFavorite,
    clearRecentConversions
  } = useUnitConverterStore();

  // Initialize unit converter on component mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Don't render until unit converter is loaded
  if (!converter) return <div className="text-center p-4">Loading unit converter...</div>;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    convert();
  };

  // Handle favorite click
  const handleAddToFavorites = () => {
    if (addToFavorites()) {
      alert('Added to favorites!');
    }
  };

  // Format number with appropriate decimal places
  const formatNumber = (num) => {
    if (Math.abs(num) >= 1000) {
      return num.toLocaleString();
    }
    
    // For small numbers, keep only necessary decimal places
    if (Math.abs(num) < 0.0001) {
      return num.toExponential(4);
    }
    
    return num;
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-6">Unit Converter</h1>
      
      {/* Unit Conversion Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded mb-6">
          {/* Unit Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Category:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.keys(unitData).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategory(category)}
                  className={`p-3 rounded border ${
                    converter.category === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {unitData[category].name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Conversion Input */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Value and Unit */}
              <div>
                <label className="block text-sm font-medium mb-2">From:</label>
                <div className="flex">
                  <input
                    type="number"
                    value={converter.fromValue}
                    onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 border rounded-l bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Enter value"
                    step="any"
                  />
                  <select
                    value={converter.fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="p-3 border border-l-0 rounded-r bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    {Object.entries(unitData[converter.category].units).map(([code, unit]) => (
                      <option key={code} value={code}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* To Unit */}
              <div>
                <label className="block text-sm font-medium mb-2">To:</label>
                <div className="flex">
                  <select
                    value={converter.toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full p-3 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    {Object.entries(unitData[converter.category].units).map(([code, unit]) => (
                      <option key={code} value={code}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Swap Units Button */}
            <div className="flex justify-center my-4">
              <button
                type="button"
                onClick={swapUnits}
                className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full"
              >
                ⇄ Swap
              </button>
            </div>
          </div>
          
          {/* Convert Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
          >
            Convert
          </button>
        </div>
      </form>
      
      {/* Results */}
      {converter.result && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          {converter.result.error ? (
            <div className="text-red-500 p-3 border rounded bg-red-50 dark:bg-red-900 dark:border-red-700">
              {converter.result.error}
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-6 p-4 border dark:border-gray-700 rounded bg-white dark:bg-gray-700">
                <div className="text-2xl font-semibold w-full md:w-2/5 text-center">
                  {formatNumber(converter.result.fromValue)} {converter.result.fromUnitName}
                </div>
                <div className="text-xl text-center">
                  =
                </div>
                <div className="text-2xl font-semibold w-full md:w-2/5 text-center">
                  {formatNumber(converter.result.toValue)} {converter.result.toUnitName}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddToFavorites}
                  className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                >
                  <span>⭐</span> <span>Save to Favorites</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Favorite Conversions */}
      {converter.favorites && converter.favorites.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Favorites</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">From</th>
                  <th className="p-2 text-left">To</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {converter.favorites.map((fav) => (
                  <tr key={fav.id} className="border-b dark:border-gray-700">
                    <td className="p-2">{unitData[fav.category].name}</td>
                    <td className="p-2">{unitData[fav.category].units[fav.fromUnit].name}</td>
                    <td className="p-2">{unitData[fav.category].units[fav.toUnit].name}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => useFavorite(fav)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Use
                      </button>
                      <button
                        onClick={() => removeFromFavorites(fav.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Recent Conversions */}
      {recentConversions.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Conversions</h2>
            <button
              onClick={clearRecentConversions}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Clear History
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">From</th>
                  <th className="p-2 text-left">To</th>
                  <th className="p-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {recentConversions.map((conv) => (
                  <tr key={conv.id} className="border-b dark:border-gray-700">
                    <td className="p-2">{unitData[conv.category].name}</td>
                    <td className="p-2">
                      {formatNumber(conv.fromValue)} {conv.fromUnitName}
                    </td>
                    <td className="p-2">
                      {formatNumber(conv.toValue)} {conv.toUnitName}
                    </td>
                    <td className="p-2 text-sm">
                      {new Date(conv.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitConverter; 