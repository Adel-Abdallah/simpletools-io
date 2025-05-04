import React from 'react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const InvoicePreview = ({ invoice }) => {
  if (!invoice) return null;
  return (
    <div className="max-w-2xl mx-auto border rounded shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 min-h-[90vh]">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <div className="text-xl font-bold mb-1">{invoice.company.name}</div>
          <div>{invoice.company.address}</div>
          <div>{invoice.company.city}, {invoice.company.zipCode}</div>
          <div>{invoice.company.phone}</div>
          <div>{invoice.company.email}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">INVOICE</div>
          <div><span className="font-semibold">Invoice #:</span> {invoice.invoiceNumber}</div>
          <div><span className="font-semibold">Date:</span> {invoice.date}</div>
          <div><span className="font-semibold">Due:</span> {invoice.dueDate}</div>
        </div>
      </div>
      {/* Bill To */}
      <div className="flex mb-8">
        <div>
          <div className="font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mb-1">Bill To:</div>
          <div>{invoice.customer.name}</div>
          <div>{invoice.customer.address}</div>
          <div>{invoice.customer.city}, {invoice.customer.zipCode}</div>
          <div>{invoice.customer.email}</div>
        </div>
      </div>
      {/* Items Table */}
      <table className="w-full mb-8 border-t border-b border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-right">Unit Price</th>
            <th className="p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-2">{item.description}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-right">{formatCurrency(item.unitPrice)}</td>
              <td className="p-2 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
            <span>Subtotal:</span>
            <span>{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
            <span>Tax ({invoice.tax}%):</span>
            <span>{formatCurrency(invoice.taxAmount)}</span>
          </div>
          <div className="flex justify-between py-1 font-bold">
            <span>Total:</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>
      {/* Notes & Terms */}
      <div className="mt-8">
        {invoice.notes && (
          <div className="mb-2">
            <span className="font-semibold">Notes:</span> {invoice.notes}
          </div>
        )}
        {invoice.terms && (
          <div>
            <span className="font-semibold">Terms:</span> {invoice.terms}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePreview; 