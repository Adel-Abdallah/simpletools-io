import { create } from 'zustand';
import { 
  getInitialInvoiceData, 
  saveInvoice as saveInvoiceApi 
} from '../api/invoiceGeneratorApi.js';

// Helper to calculate invoice totals
const calculateTotals = (invoice) => {
  // Calculate subtotal
  const subtotal = invoice.items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice);
  }, 0);
  
  // Calculate tax amount
  const taxAmount = (subtotal * invoice.tax) / 100;
  
  // Calculate total
  const total = subtotal + taxAmount;
  
  return {
    ...invoice,
    subtotal,
    taxAmount,
    total
  };
};

const useInvoiceStore = create((set, get) => ({
  // Current invoice being edited
  invoice: null,
  
  // Saved invoices list
  savedInvoices: [],
  
  // Initialize with a new invoice
  initializeInvoice: () => {
    const initialData = calculateTotals(getInitialInvoiceData());
    set({ invoice: initialData });
  },
  
  // Update invoice fields
  updateInvoice: (field, value) => {
    set((state) => {
      const updatedInvoice = { 
        ...state.invoice, 
        [field]: value 
      };
      return { 
        invoice: calculateTotals(updatedInvoice) 
      };
    });
  },
  
  // Update nested fields (company, customer)
  updateNestedField: (section, field, value) => {
    set((state) => {
      const updatedInvoice = {
        ...state.invoice,
        [section]: {
          ...state.invoice[section],
          [field]: value
        }
      };
      return { 
        invoice: calculateTotals(updatedInvoice) 
      };
    });
  },
  
  // Add a new line item
  addItem: () => {
    set((state) => {
      const newItem = {
        id: Date.now(),
        description: '',
        quantity: 1,
        unitPrice: 0
      };
      
      const updatedInvoice = {
        ...state.invoice,
        items: [...state.invoice.items, newItem]
      };
      
      return { 
        invoice: calculateTotals(updatedInvoice) 
      };
    });
  },
  
  // Update a line item
  updateItem: (itemId, field, value) => {
    set((state) => {
      const updatedItems = state.invoice.items.map(item => {
        if (item.id === itemId) {
          return { ...item, [field]: value };
        }
        return item;
      });
      
      const updatedInvoice = {
        ...state.invoice,
        items: updatedItems
      };
      
      return { 
        invoice: calculateTotals(updatedInvoice) 
      };
    });
  },
  
  // Remove a line item
  removeItem: (itemId) => {
    set((state) => {
      const updatedItems = state.invoice.items.filter(item => item.id !== itemId);
      
      const updatedInvoice = {
        ...state.invoice,
        items: updatedItems
      };
      
      return { 
        invoice: calculateTotals(updatedInvoice) 
      };
    });
  },
  
  // Save the current invoice
  saveInvoice: () => {
    const { invoice } = get();
    const success = saveInvoiceApi(invoice);
    
    if (success) {
      // Add to saved invoices if it's new
      set((state) => {
        const exists = state.savedInvoices.some(inv => inv.id === invoice.id);
        
        if (!exists) {
          return { 
            savedInvoices: [...state.savedInvoices, invoice] 
          };
        }
        
        return state;
      });
    }
    
    return success;
  }
}));

export default useInvoiceStore; 