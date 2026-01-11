import { invalidateCache } from './apiCache';

export const invalidateJobCache = (jobId) => {
    invalidateCache('jobs_list');
    if (jobId) invalidateCache(`job_${jobId}`);
};

export const invalidateInvoiceCache = (invoiceId) => {
    invalidateCache('invoices_list');
    if (invoiceId) invalidateCache(`invoice_${invoiceId}`);
};

export const invalidateReceiptCache = () => {
    invalidateCache('item_library');
    invalidateCache('vendor_analysis');
};

export const invalidateAllReports = () => {
    invalidateCache('report_');
};