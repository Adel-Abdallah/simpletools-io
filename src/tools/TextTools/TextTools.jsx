import React, { useEffect } from 'react';
import useTextToolsStore from '../../stores/useTextToolsStore.js';

const TextTools = () => {
  // Get text tools data and functions from the store
  const {
    textTools,
    recentOperations,
    initialize,
    setTool,
    setText,
    setOption,
    processText,
    copyResultToInput
  } = useTextToolsStore();

  // Initialize text tools on component mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Don't render until text tools are loaded
  if (!textTools) return <div className="text-center p-4">Loading text tools...</div>;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    processText();
  };

  // Handle copy result to input
  const handleCopyToInput = () => {
    if (copyResultToInput()) {
      // Reset result after copying
      textTools.result = null;
    }
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    if (textTools.result && textTools.result.result) {
      navigator.clipboard.writeText(textTools.result.result)
        .then(() => {
          alert('Text copied to clipboard!');
        })
        .catch((err) => {
          console.error('Could not copy text:', err);
        });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-6">Text Tools</h1>

      {/* Tool Selection */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">Select a Tool</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setTool('counter')}
            className={`p-3 rounded border ${
              textTools.tool === 'counter'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Word & Character Counter
          </button>
          <button
            onClick={() => setTool('case')}
            className={`p-3 rounded border ${
              textTools.tool === 'case'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Case Converter
          </button>
          <button
            onClick={() => setTool('format')}
            className={`p-3 rounded border ${
              textTools.tool === 'format'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Text Formatter
          </button>
          <button
            onClick={() => setTool('lines')}
            className={`p-3 rounded border ${
              textTools.tool === 'lines'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            Line Operations
          </button>
        </div>
      </div>

      {/* Tool Options */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">Options</h2>
        {textTools.tool === 'counter' && (
          <p className="text-gray-600 dark:text-gray-300">
            Counts the characters, words, lines, and paragraphs in your text.
          </p>
        )}
        
        {textTools.tool === 'case' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="case"
                checked={textTools.options.case === 'lower'}
                onChange={() => setOption('case', 'lower')}
                className="text-blue-500"
              />
              <span>lowercase</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="case"
                checked={textTools.options.case === 'upper'}
                onChange={() => setOption('case', 'upper')}
                className="text-blue-500"
              />
              <span>UPPERCASE</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="case"
                checked={textTools.options.case === 'title'}
                onChange={() => setOption('case', 'title')}
                className="text-blue-500"
              />
              <span>Title Case</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="case"
                checked={textTools.options.case === 'sentence'}
                onChange={() => setOption('case', 'sentence')}
                className="text-blue-500"
              />
              <span>Sentence case</span>
            </label>
          </div>
        )}
        
        {textTools.tool === 'format' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="format"
                checked={textTools.options.format === 'trim'}
                onChange={() => setOption('format', 'trim')}
                className="text-blue-500"
              />
              <span>Trim</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="format"
                checked={textTools.options.format === 'removeExtraSpaces'}
                onChange={() => setOption('format', 'removeExtraSpaces')}
                className="text-blue-500"
              />
              <span>Remove Extra Spaces</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="format"
                checked={textTools.options.format === 'removeLineBreaks'}
                onChange={() => setOption('format', 'removeLineBreaks')}
                className="text-blue-500"
              />
              <span>Remove Line Breaks</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="format"
                checked={textTools.options.format === 'removeSpecialChars'}
                onChange={() => setOption('format', 'removeSpecialChars')}
                className="text-blue-500"
              />
              <span>Remove Special Chars</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="format"
                checked={textTools.options.format === 'json'}
                onChange={() => setOption('format', 'json')}
                className="text-blue-500"
              />
              <span>Format JSON</span>
            </label>
          </div>
        )}
        
        {textTools.tool === 'lines' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="lines"
                checked={textTools.options.lines === 'removeDuplicates'}
                onChange={() => setOption('lines', 'removeDuplicates')}
                className="text-blue-500"
              />
              <span>Remove Duplicates</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="lines"
                checked={textTools.options.lines === 'sortAscending'}
                onChange={() => setOption('lines', 'sortAscending')}
                className="text-blue-500"
              />
              <span>Sort A-Z</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="lines"
                checked={textTools.options.lines === 'sortDescending'}
                onChange={() => setOption('lines', 'sortDescending')}
                className="text-blue-500"
              />
              <span>Sort Z-A</span>
            </label>
            
            <label className="flex items-center space-x-2 p-2 rounded border dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="lines"
                checked={textTools.options.lines === 'shuffle'}
                onChange={() => setOption('lines', 'shuffle')}
                className="text-blue-500"
              />
              <span>Shuffle Lines</span>
            </label>
          </div>
        )}
      </div>

      {/* Text Input and Process Button */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-3">Text Input</h2>
          <textarea
            value={textTools.text}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            className="w-full p-3 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter or paste your text here..."
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Process Text
          </button>
        </div>
      </form>

      {/* Results */}
      {textTools.result && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-3">Results</h2>
          
          {textTools.result.error ? (
            <div className="text-red-500 p-3 border rounded bg-red-50 dark:bg-red-900 dark:border-red-700">
              {textTools.result.error}
            </div>
          ) : (
            <div>
              {textTools.tool === 'counter' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 border rounded bg-white dark:bg-gray-700 text-center">
                    <div className="text-lg font-bold">{textTools.result.characters}</div>
                    <div className="text-sm">Characters</div>
                  </div>
                  <div className="p-3 border rounded bg-white dark:bg-gray-700 text-center">
                    <div className="text-lg font-bold">{textTools.result.words}</div>
                    <div className="text-sm">Words</div>
                  </div>
                  <div className="p-3 border rounded bg-white dark:bg-gray-700 text-center">
                    <div className="text-lg font-bold">{textTools.result.lines}</div>
                    <div className="text-sm">Lines</div>
                  </div>
                  <div className="p-3 border rounded bg-white dark:bg-gray-700 text-center">
                    <div className="text-lg font-bold">{textTools.result.paragraphs}</div>
                    <div className="text-sm">Paragraphs</div>
                  </div>
                </div>
              )}
              
              {(textTools.tool === 'case' || textTools.tool === 'format' || textTools.tool === 'lines') && (
                <div>
                  <textarea
                    readOnly
                    value={textTools.result.result}
                    rows="10"
                    className="w-full p-3 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  ></textarea>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={handleCopyToClipboard}
                      className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Copy to Clipboard
                    </button>
                    <button
                      onClick={handleCopyToInput}
                      className="px-3 py-1.5 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Copy to Input
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Recent Operations */}
      {recentOperations.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-3">Recent Operations</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2 text-left">Tool</th>
                  <th className="p-2 text-left">Option</th>
                  <th className="p-2 text-left">Input Sample</th>
                  <th className="p-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {recentOperations.map((op) => (
                  <tr key={op.id} className="border-b dark:border-gray-700">
                    <td className="p-2 capitalize">{op.tool}</td>
                    <td className="p-2">{op.option || '-'}</td>
                    <td className="p-2 max-w-xs truncate">{op.textSample}</td>
                    <td className="p-2 text-sm">{new Date(op.timestamp).toLocaleString()}</td>
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

export default TextTools; 