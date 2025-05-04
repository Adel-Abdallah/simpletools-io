import React, { useEffect } from 'react';
import useDateCalculatorStore from '../../stores/useDateCalculatorStore.js';
import { generateCountdownShareableLink } from '../../api/dateCalculatorApi.js';

const DateCalculator = () => {
  // Get calculator data and functions from the store
  const { 
    calculator, 
    initialize, 
    setMode, 
    setDate, 
    setDays,
    toggleIncludeEndDate,
    setCountdownName,
    calculate,
    recentCalculations
  } = useDateCalculatorStore();

  // Initialize calculator on component mount
  useEffect(() => {
    initialize();
    // Calculate on initial load if URL has parameters
    if (window.location.search) {
      setTimeout(() => {
        calculate();
      }, 100);
    }
  }, [initialize, calculate]);

  // Don't render until calculator is loaded
  if (!calculator) return <div className="text-center p-4">Loading calculator data...</div>;

  // Handle calculation
  const handleCalculate = (e) => {
    e.preventDefault();
    calculate();
  };

  // Handle mode change
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  // Generate shareable link for countdown
  const generateShareableLink = () => {
    if (calculator.mode === 'countdown' && calculator.date1) {
      return generateCountdownShareableLink({
        date: calculator.date1,
        name: calculator.countdownName || 'Countdown'
      });
    }
    return '';
  };

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    const link = generateShareableLink();
    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
      }).catch((err) => {
        console.error('Could not copy link:', err);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-6">Date Calculator</h1>
      
      {/* Calculator Form */}
      <form onSubmit={handleCalculate}>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded mb-6">
          {/* Calculator Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Calculation Type:</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value="difference"
                  checked={calculator.mode === 'difference'}
                  onChange={handleModeChange}
                  className="text-blue-500"
                />
                <span>Date Difference</span>
              </label>
              
              <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value="add"
                  checked={calculator.mode === 'add'}
                  onChange={handleModeChange}
                  className="text-blue-500"
                />
                <span>Add Days</span>
              </label>
              
              <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value="subtract"
                  checked={calculator.mode === 'subtract'}
                  onChange={handleModeChange}
                  className="text-blue-500"
                />
                <span>Subtract Days</span>
              </label>
              
              <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="mode"
                  value="countdown"
                  checked={calculator.mode === 'countdown'}
                  onChange={handleModeChange}
                  className="text-blue-500"
                />
                <span>Countdown</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Date Difference Inputs */}
            {calculator.mode === 'difference' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={calculator.date1}
                    onChange={(e) => setDate('date1', e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={calculator.date2}
                    onChange={(e) => setDate('date2', e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calculator.includeEndDate}
                      onChange={toggleIncludeEndDate}
                      className="text-blue-500 rounded"
                    />
                    <span>Include end date in calculation</span>
                  </label>
                </div>
              </div>
            )}
            
            {/* Add Days Inputs */}
            {calculator.mode === 'add' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={calculator.date1}
                    onChange={(e) => setDate('date1', e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Days to Add</label>
                  <input
                    type="number"
                    value={calculator.days}
                    onChange={(e) => setDays(e.target.value)}
                    min="0"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
            
            {/* Subtract Days Inputs */}
            {calculator.mode === 'subtract' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={calculator.date1}
                    onChange={(e) => setDate('date1', e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Days to Subtract</label>
                  <input
                    type="number"
                    value={calculator.days}
                    onChange={(e) => setDays(e.target.value)}
                    min="0"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
            
            {/* Countdown Inputs */}
            {calculator.mode === 'countdown' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Countdown Name</label>
                  <input
                    type="text"
                    value={calculator.countdownName}
                    onChange={(e) => setCountdownName(e.target.value)}
                    placeholder="My Event"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Target Date</label>
                  <input
                    type="date"
                    value={calculator.date1}
                    onChange={(e) => setDate('date1', e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Calculate
          </button>
        </div>
      </form>
      
      {/* Results Section */}
      {calculator.result && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          {calculator.result.error ? (
            <div className="text-red-500">{calculator.result.error}</div>
          ) : (
            <div>
              {/* Date Difference Result */}
              {calculator.mode === 'difference' && (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{calculator.result.text}</div>
                  <div>
                    <strong>From:</strong> {calculator.result.startDate} <strong>To:</strong> {calculator.result.endDate}
                  </div>
                </div>
              )}
              
              {/* Add/Subtract Days Result */}
              {(calculator.mode === 'add' || calculator.mode === 'subtract') && (
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{calculator.result.resultDate}</div>
                  <div>{calculator.result.text}</div>
                </div>
              )}
              
              {/* Countdown Result */}
              {calculator.mode === 'countdown' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold">{calculator.result.name}</div>
                    {calculator.result.isPast ? (
                      <div className="text-lg">
                        This event occurred {calculator.result.days} day{calculator.result.days !== 1 ? 's' : ''} ago.
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-3 gap-4 text-center my-4">
                          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                            <div className="text-3xl font-bold">{calculator.result.days}</div>
                            <div>Days</div>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                            <div className="text-3xl font-bold">{calculator.result.hours}</div>
                            <div>Hours</div>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                            <div className="text-3xl font-bold">{calculator.result.minutes}</div>
                            <div>Minutes</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={copyLinkToClipboard}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                          >
                            Share Countdown
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Recent Calculations */}
      {recentCalculations.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Recent Calculations</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Details</th>
                  <th className="p-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody>
                {recentCalculations.map((calc) => (
                  <tr key={calc.id} className="border-b dark:border-gray-700">
                    <td className="p-2 capitalize">{calc.mode}</td>
                    <td className="p-2">
                      {calc.mode === 'difference' && (
                        <span>From {calc.date1} to {calc.date2}</span>
                      )}
                      {(calc.mode === 'add' || calc.mode === 'subtract') && (
                        <span>{calc.mode === 'add' ? 'Add' : 'Subtract'} {calc.days} days to {calc.date1}</span>
                      )}
                      {calc.mode === 'countdown' && (
                        <span>{calc.countdownName} on {calc.date1}</span>
                      )}
                    </td>
                    <td className="p-2">{calc.result.text}</td>
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

export default DateCalculator; 