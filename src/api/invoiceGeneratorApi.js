// Invoice Generator API - data persistence
// For now, using localStorage. Could be expanded to a backend API in the future

// Save invoice to localStorage
export function saveInvoice(invoice) {
  try {
    // Get existing invoices or initialize empty array
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Check if we're updating an existing invoice
    const index = existingInvoices.findIndex(inv => inv.id === invoice.id);
    
    if (index !== -1) {
      // Update existing invoice
      existingInvoices[index] = invoice;
    } else {
      // Add new invoice
      existingInvoices.push(invoice);
    }
    
    // Save back to localStorage
    localStorage.setItem('invoices', JSON.stringify(existingInvoices));
    return true;
  } catch (error) {
    console.error('Error saving invoice:', error);
    return false;
  }
}

// Get all saved invoices
export function getInvoices() {
  try {
    return JSON.parse(localStorage.getItem('invoices') || '[]');
  } catch (error) {
    console.error('Error loading invoices:', error);
    return [];
  }
}

// Get a specific invoice by ID
export function getInvoiceById(id) {
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    return invoices.find(invoice => invoice.id === id) || null;
  } catch (error) {
    console.error('Error loading invoice:', error);
    return null;
  }
}

// Get initial invoice data (empty template or default values)
export function getInitialInvoiceData() {
  return {
    id: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    company: {
      name: 'Your Company Name',
      address: 'Your Company Address',
      city: 'City',
      zipCode: 'Zip Code',
      phone: '(123) 456-7890',
      email: 'company@example.com',
    },
    customer: {
      name: 'Customer Name',
      address: 'Customer Address',
      city: 'City',
      zipCode: 'Zip Code',
      email: 'customer@example.com',
    },
    items: [
      {
        id: 1,
        description: 'Item description',
        quantity: 1,
        unitPrice: 100,
      }
    ],
    notes: 'Thank you for your business!',
    terms: 'Payment due within 30 days',
    tax: 10, // 10%
    subtotal: 0, // Will be calculated in the store
    taxAmount: 0, // Will be calculated in the store
    total: 0, // Will be calculated in the store
  };
} 