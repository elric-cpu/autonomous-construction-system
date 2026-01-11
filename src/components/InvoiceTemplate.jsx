import React from 'react';

// This component is designed to be rendered into a hidden div and then captured by html2pdf
const InvoiceTemplate = ({ invoice, company, lineItems, payments }) => {
  if (!invoice) return null;

  return (
    <div id="invoice-template" className="bg-white p-8 max-w-4xl mx-auto text-gray-900" style={{ width: '800px', minHeight: '1000px' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
           {company?.company_logo_url ? (
             <img src={company.company_logo_url} alt="Logo" className="h-16 mb-4" />
           ) : (
             <h1 className="text-3xl font-bold text-maroon mb-2">{company?.company_name || 'Benson Home Solutions'}</h1>
           )}
           <div className="text-sm text-gray-600 whitespace-pre-line">
             {company?.company_address || '123 Main St\nPortland, OR 97204'}
             <br />
             {company?.company_phone}
             <br />
             {company?.company_email}
           </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-light text-gray-400 mb-2">INVOICE</h2>
          <div className="text-gray-600">
            <p><strong>Invoice #:</strong> {invoice.invoice_number}</p>
            <p><strong>Date:</strong> {invoice.invoice_date}</p>
            <p><strong>Due Date:</strong> {invoice.due_date}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-12">
        <h3 className="text-gray-500 uppercase text-xs font-bold mb-2 tracking-wider">Bill To</h3>
        <div className="text-lg font-bold">{invoice.customers?.name}</div>
        <div className="text-gray-600 whitespace-pre-line">
          {invoice.customers?.address}
          <br/>
          {invoice.customers?.email}
        </div>
      </div>

      {/* Line Items */}
      <table className="w-full mb-8 border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-left py-3 font-bold text-gray-800">Description</th>
            <th className="text-right py-3 font-bold text-gray-800 w-24">Qty</th>
            <th className="text-right py-3 font-bold text-gray-800 w-32">Unit Price</th>
            <th className="text-right py-3 font-bold text-gray-800 w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="py-4">
                <div className="font-bold">{item.item_name}</div>
                {item.description && <div className="text-sm text-gray-500">{item.description}</div>}
              </td>
              <td className="py-4 text-right">{item.quantity}</td>
              <td className="py-4 text-right">${item.unit_cost?.toFixed(2)}</td>
              <td className="py-4 text-right">${item.total_cost?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${invoice.subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax ({invoice.tax_rate}%)</span>
            <span>${invoice.tax_amount?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t border-gray-800 pt-2">
            <span>Total</span>
            <span>${invoice.total_amount?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Payments */}
      {payments && payments.length > 0 && (
         <div className="mb-8 p-4 bg-gray-50 rounded">
            <h4 className="font-bold text-sm text-gray-700 mb-2">Payment History</h4>
            {payments.map(p => (
               <div key={p.id} className="flex justify-between text-sm text-gray-600">
                 <span>{p.payment_date} - {p.payment_method}</span>
                 <span>-${p.amount_paid?.toFixed(2)}</span>
               </div>
            ))}
            <div className="flex justify-between font-bold text-gray-800 mt-2 border-t pt-2">
              <span>Amount Due</span>
              <span>
                ${(invoice.total_amount - payments.reduce((sum,p) => sum + (p.amount_paid||0), 0)).toFixed(2)}
              </span>
            </div>
         </div>
      )}

      {/* Notes */}
      {invoice.notes && (
        <div className="border-t pt-4 text-gray-500 text-sm">
          <strong>Notes:</strong> {invoice.notes}
        </div>
      )}
    </div>
  );
};

export default InvoiceTemplate;