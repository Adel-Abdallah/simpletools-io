import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.jsx';

const Navbar = () => (
  <nav className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800">
    <div className="flex items-center space-x-4">
      <Link to="/" className="font-bold text-lg text-blue-600 dark:text-blue-300">SimpleTools.io</Link>
      <Link to="/markdown-editor" className="hover:underline">Markdown</Link>
      <Link to="/invoice-generator" className="hover:underline">Invoice</Link>
      <Link to="/date-calculator" className="hover:underline">DateCalc</Link>
      <Link to="/text-tools" className="hover:underline">TextTools</Link>
      <Link to="/unit-converter" className="hover:underline">Converter</Link>
      <Link to="/qr-code-generator" className="hover:underline">QR Code</Link>
      <Link to="/color-picker" className="hover:underline">ColorPicker</Link>
      <Link to="/image-resizer" className="hover:underline">ImageResizer</Link>
      <Link to="/image-compressor" className="hover:underline">ImageCompressor</Link>
      <Link to="/image-optimizer" className="hover:underline">ImageOptimizer</Link>
      <Link to="/email-signature-generator" className="hover:underline">email signature</Link>
    </div>
    <ThemeSwitcher />
  </nav>
);

export default Navbar; 