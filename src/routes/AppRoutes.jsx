import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../tools/Home/Home.jsx';
import MarkdownEditor from '../tools/MarkdownEditor/MarkdownEditor.jsx';
import InvoiceGenerator from '../tools/InvoiceGenerator/InvoiceGenerator.jsx';
import DateCalculator from '../tools/DateCalculator/DateCalculator.jsx';
import TextTools from '../tools/TextTools/TextTools.jsx';
import UnitConverter from '../tools/UnitConverter/UnitConverter.jsx';
import EmailSignatureGenerator from '../tools/EmailSignatureGenerator/EmailSignatureGenerator.jsx';

const Placeholder = ({ name }) => (
  <div className="p-8 text-center text-gray-500">{name} coming soon...</div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/markdown-editor" element={<MarkdownEditor />} />
    <Route path="/invoice-generator" element={<InvoiceGenerator />} />
    <Route path="/date-calculator" element={<DateCalculator />} />
    <Route path="/text-tools" element={<TextTools />} />
    <Route path="/unit-converter" element={<UnitConverter />} />
    <Route path="/email-signature-generator" element={<EmailSignatureGenerator />} />
    <Route path="/qr-code-generator" element={<Placeholder name="QR Code Generator" />} />
    <Route path="/color-picker" element={<Placeholder name="Color Picker" />} />
    <Route path="/image-resizer" element={<Placeholder name="Image Resizer" />} />
    <Route path="/image-compressor" element={<Placeholder name="Image Compressor" />} />
    <Route path="/image-optimizer" element={<Placeholder name="Image Optimizer" />} />
  </Routes>
);

export default AppRoutes; 