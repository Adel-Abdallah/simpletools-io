import React, { useEffect, useState } from 'react';
import { fetchInitialMarkdown } from '../api/markdownEditorApi.js';
import useMarkdownEditorStore from '../stores/useMarkdownEditorStore.js';
import useInvoiceStore from '../stores/useInvoiceStore.js';
import useDateCalculatorStore from '../stores/useDateCalculatorStore.js';
import useTextToolsStore from '../stores/useTextToolsStore.js';
import useUnitConverterStore from '../stores/useUnitConverterStore.js';
import { useLocation } from 'react-router-dom';

const InitializationModal = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const initializeMarkdown = useMarkdownEditorStore((s) => s.initializeMarkdown);
  const initializeInvoice = useInvoiceStore((s) => s.initializeInvoice);
  const initializeDateCalculator = useDateCalculatorStore((s) => s.initialize);
  const initializeTextTools = useTextToolsStore((s) => s.initialize);
  const initializeUnitConverter = useUnitConverterStore((s) => s.initialize);

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      // Initialize based on current route
      if (location.pathname === '/markdown-editor') {
        const initial = fetchInitialMarkdown();
        initializeMarkdown(initial);
      } else if (location.pathname === '/invoice-generator') {
        initializeInvoice();
      } else if (location.pathname === '/date-calculator') {
        initializeDateCalculator();
      } else if (location.pathname === '/text-tools') {
        initializeTextTools();
      } else if (location.pathname === '/unit-converter') {
        initializeUnitConverter();
      }
      
      setLoading(false);
    }, 500); // Simulate delay
  }, [
    initializeMarkdown,
    initializeInvoice,
    initializeDateCalculator,
    initializeTextTools,
    initializeUnitConverter,
    location.pathname
  ]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow">
        <span>Loading initial data...</span>
      </div>
    </div>
  );
};

export default InitializationModal; 