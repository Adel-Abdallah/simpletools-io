import React, { useEffect } from 'react';
import useInvoiceStore from '../../stores/useInvoiceStore.js';
import { PDFDownloadButton } from './InvoicePDF.jsx';
import InvoicePreview from './InvoicePreview.jsx';

// Component to display currency values
const CurrencyDisplay = ({ value }) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const InvoiceGenerator = () => {
  // Get invoice data and functions from the store
  const { 
    invoice, 
    initializeInvoice, 
    updateInvoice,
    updateNestedField,
    addItem,
    updateItem,
    removeItem,
    saveInvoice
  } = useInvoiceStore();

  // Initialize invoice on component mount
  useEffect(() => {
    initializeInvoice();
  }, [initializeInvoice]);

  // Don't render until invoice is loaded
  if (!invoice) return <div className="text-center p-4">Loading invoice data...</div>;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Check if nested field (contains dot notation)
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      updateNestedField(section, field, value);
    } else {
      updateInvoice(name, value);
    }
  };

  // Handle number input changes (convert to number)
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    updateInvoice(name, parseFloat(value) || 0);
  };

  // Handle line item changes
  const handleItemChange = (itemId, field, value) => {
    // Convert to number if quantity or price
    if (field === 'quantity' || field === 'unitPrice') {
      value = parseFloat(value) || 0;
    }
    
    updateItem(itemId, field, value);
  };

  // Handle save
  const handleSave = () => {
    if (saveInvoice()) {
      alert('Invoice saved successfully!');
    } else {
      alert('Failed to save invoice. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen">
      {/* Form Section */}
      <div className="flex-1 max-w-3xl mx-auto mt-6 p-4">
        <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
        
        {/* Invoice Info Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Invoice Date</label>
              <input
                type="date"
                name="date"
                value={invoice.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
              <input
                type="number"
                name="tax"
                value={invoice.tax}
                onChange={handleNumberChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
        
        {/* Company Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Company</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="company.name"
                value={invoice.company.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="company.address"
                value={invoice.company.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="company.city"
                value={invoice.company.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                name="company.zipCode"
                value={invoice.company.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="company.phone"
                value={invoice.company.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="company.email"
                value={invoice.company.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
        
        {/* Customer Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                name="customer.name"
                value={invoice.customer.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="customer.address"
                value={invoice.customer.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="customer.city"
                value={invoice.customer.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                name="customer.zipCode"
                value={invoice.customer.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="customer.email"
                value={invoice.customer.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
        
        {/* Items Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full mb-4">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-right">Unit Price</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                        min="1"
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-center"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                        min="0"
                        step="0.01"
                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-right"
                      />
                    </td>
                    <td className="p-2 text-right">
                      <CurrencyDisplay value={item.quantity * item.unitPrice} />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={invoice.items.length <= 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={addItem}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </div>
        
        {/* Totals Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span>
                <span><CurrencyDisplay value={invoice.subtotal} /></span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Tax ({invoice.tax}%):</span>
                <span><CurrencyDisplay value={invoice.taxAmount} /></span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span><CurrencyDisplay value={invoice.total} /></span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes and Terms */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">Notes & Terms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                name="notes"
                value={invoice.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
              <textarea
                name="terms"
                value={invoice.terms}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Save Invoice
          </button>
          
          <PDFDownloadButton invoice={invoice} />
        </div>
      </div>
      {/* Live Preview Section */}
      <div className="flex-1 min-h-screen max-h-auto overflow-auto bg-white dark:bg-gray-900 p-4">
        <label className="mb-2 font-semibold text-lg block">Live Preview</label>
        <InvoicePreview invoice={invoice} />
      </div>
    </div>
  );
};

export default InvoiceGenerator; 