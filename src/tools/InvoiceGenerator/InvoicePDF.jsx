import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink, 
  Font 
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    width: '60%',
  },
  headerRight: {
    width: '40%',
    alignItems: 'flex-end',
  },
  invoiceInfoItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 120,
  },
  infoValue: {
    width: 120,
    textAlign: 'right',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  billingColumn: {
    width: '45%',
  },
  billingTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#eee',
    padding: 5,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontWeight: 'bold',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  description: {
    width: '50%',
  },
  quantity: {
    width: '10%',
    textAlign: 'center',
  },
  price: {
    width: '20%',
    textAlign: 'right',
  },
  amount: {
    width: '20%',
    textAlign: 'right',
  },
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalsTable: {
    width: '40%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 3,
  },
  totalsLabel: {
    width: '60%',
    textAlign: 'right',
  },
  totalsValue: {
    width: '40%',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    borderBottomWidth: 0,
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    fontSize: 10,
    marginBottom: 5,
  },
  footerTitle: {
    fontWeight: 'bold',
  },
});

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Invoice PDF Document
const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.companyName}>{invoice.company.name}</Text>
          <Text>{invoice.company.address}</Text>
          <Text>{invoice.company.city}, {invoice.company.zipCode}</Text>
          <Text>{invoice.company.phone}</Text>
          <Text>{invoice.company.email}</Text>
        </View>
        
        <View style={styles.headerRight}>
          <Text style={styles.title}>INVOICE</Text>
          
          <View style={styles.invoiceInfoItem}>
            <Text style={styles.infoLabel}>Invoice Number:</Text>
            <Text style={styles.infoValue}>{invoice.invoiceNumber}</Text>
          </View>
          
          <View style={styles.invoiceInfoItem}>
            <Text style={styles.infoLabel}>Invoice Date:</Text>
            <Text style={styles.infoValue}>{invoice.date}</Text>
          </View>
          
          <View style={styles.invoiceInfoItem}>
            <Text style={styles.infoLabel}>Due Date:</Text>
            <Text style={styles.infoValue}>{invoice.dueDate}</Text>
          </View>
        </View>
      </View>
      
      {/* Billing & Shipping */}
      <View style={styles.billingSection}>
        <View style={styles.billingColumn}>
          <Text style={styles.billingTitle}>Bill To:</Text>
          <Text>{invoice.customer.name}</Text>
          <Text>{invoice.customer.address}</Text>
          <Text>{invoice.customer.city}, {invoice.customer.zipCode}</Text>
          <Text>{invoice.customer.email}</Text>
        </View>
      </View>
      
      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.quantity}>Qty</Text>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>
        
        {invoice.items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Text style={styles.price}>{formatCurrency(item.unitPrice)}</Text>
            <Text style={styles.amount}>{formatCurrency(item.quantity * item.unitPrice)}</Text>
          </View>
        ))}
      </View>
      
      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalsTable}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal:</Text>
            <Text style={styles.totalsValue}>{formatCurrency(invoice.subtotal)}</Text>
          </View>
          
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Tax ({invoice.tax}%):</Text>
            <Text style={styles.totalsValue}>{formatCurrency(invoice.taxAmount)}</Text>
          </View>
          
          <View style={[styles.totalsRow, styles.totalRow]}>
            <Text style={styles.totalsLabel}>Total:</Text>
            <Text style={styles.totalsValue}>{formatCurrency(invoice.total)}</Text>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, styles.footerTitle]}>Notes:</Text>
        <Text style={styles.footerText}>{invoice.notes}</Text>
        
        <Text style={[styles.footerText, styles.footerTitle, { marginTop: 10 }]}>Terms & Conditions:</Text>
        <Text style={styles.footerText}>{invoice.terms}</Text>
      </View>
    </Page>
  </Document>
);

// PDF Download Button Component
const PDFDownloadButton = ({ invoice }) => (
  <PDFDownloadLink 
    document={<InvoicePDF invoice={invoice} />} 
    fileName={`invoice-${invoice.invoiceNumber}.pdf`}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
  >
    {({ blob, url, loading, error }) =>
      loading ? 'Generating PDF...' : 'Download PDF'
    }
  </PDFDownloadLink>
);

export { InvoicePDF, PDFDownloadButton }; 