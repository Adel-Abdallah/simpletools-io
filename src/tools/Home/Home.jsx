import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Tool data with descriptions and placeholder images
  const tools = [
    {
      id: 'markdown-editor',
      title: 'Markdown Editor',
      description: 'Create and preview Markdown documents with our interactive editor. Export to various formats and see changes in real-time.',
      image: '📝',
      color: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      id: 'invoice-generator',
      title: 'Invoice Generator',
      description: 'Create professional invoices with your company details, customer information, and line items. Download as PDF for sharing.',
      image: '🧾',
      color: 'bg-green-100 dark:bg-green-900'
    },
    {
      id: 'date-calculator',
      title: 'Date Calculator',
      description: 'Calculate date differences, add or subtract days from dates, and create shareable countdown timers for special events.',
      image: '📆',
      color: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      id: 'text-tools',
      title: 'Text Tools',
      description: 'All-in-one tool for text manipulation: word count, case conversion, formatting and line operations. Process text with ease.',
      image: '✏️',
      color: 'bg-yellow-100 dark:bg-yellow-900'
    },
    {
      id: 'unit-converter',
      title: 'Unit Converter',
      description: 'Convert between different units of measurement including length, weight, temperature, and more. Quick and accurate.',
      image: '📐',
      color: 'bg-red-100 dark:bg-red-900'
    },
    {
      id: 'email-signature-generator',
      title: 'Email Signature Generator',
      description: 'Create beautiful, professional email signatures for Gmail, Outlook, and more. Choose a template, customize, and copy with one click. (Coming soon!)',
      image: '✉️',
      color: 'bg-pink-100 dark:bg-pink-900'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to SimpleTools.io</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A collection of simple but powerful tools to help with your everyday tasks.
          <br />
          All tools work in your browser - no installation or signup required!
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => (
          <Link 
            to={`/${tool.id}`} 
            key={tool.id}
            className="block transition-transform hover:scale-105"
          >
            <div className="h-full border rounded-lg overflow-hidden shadow-md hover:shadow-lg dark:border-gray-700">
              <div className={`${tool.color} p-8 flex justify-center items-center`}>
                <div className="text-6xl">{tool.image}</div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Use SimpleTools.io?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Fast &amp; Efficient</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All tools work entirely in your browser with no server processing,
              ensuring quick results and maximum privacy.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">💻</div>
            <h3 className="text-lg font-semibold mb-2">Use Anywhere</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Works on all devices and browsers. Access your favorite tools from
              desktop, tablet, or mobile.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🛠️</div>
            <h3 className="text-lg font-semibold mb-2">All-in-One Toolkit</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Multiple tools in one place, designed to work together.
              Chain operations and boost your productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Click on any of the tools above to start using them right away.
          No signup required!
        </p>
        <div className="inline-flex space-x-4">
          <Link 
            to="/markdown-editor" 
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
          >
            Try Markdown Editor
          </Link>
          <Link 
            to="/text-tools" 
            className="px-6 py-3 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
          >
            Explore Text Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 