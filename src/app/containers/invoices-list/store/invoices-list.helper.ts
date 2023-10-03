import {InvoiceDto, JobAd} from '../../../models/models';

/**
 * Builds the invoice object when publishing a Job Ad
 * @param jobAd
 */
export const buildInvoice = (jobAd: JobAd): InvoiceDto => {
  const currentDate = new Date();

  return <InvoiceDto>{
    jobAdId: jobAd.id,
    amount: getInvoiceAmount(jobAd),
    updatedAt: currentDate,
    createdAt: currentDate,
    dueDate: getInvoiceDueDate(currentDate),
  };
};

/**
 * Calculates the invoice amount.
 * Currently, it's the amount of words in the description multiplied by 5
 * @param jobAd
 */
const getInvoiceAmount = (jobAd: JobAd): number => {
  return jobAd.description.split(' ').length * 5;
};

/**
 * Calculates the invoice due date
 * If the publish date is before the 15th of the month, the invoice is due at the end of the next month
 * Otherwise, it is due at the end of the month 2 months from now
 * @param publishDate
 */
const getInvoiceDueDate = (publishDate: Date): Date => {
  const numberOfMonthsToAdd = publishDate.getDate() < 15 ? 1 : 2;
  const dueDate = new Date(publishDate);
  dueDate.setMonth(dueDate.getMonth() + numberOfMonthsToAdd);
  return getEndOfMonth(dueDate);
};

/**
 * Gets the last day of the month of the provided date
 * @param date
 */
const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
