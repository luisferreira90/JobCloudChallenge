import { buildInvoice } from './invoices-list.helper';
import { JobAd } from '../../../models/models';
import MockDate from 'mockdate';

let defaultJobAd = <JobAd>{
  id: 1,
  title: 'Test',
  description: 'This is a test description',
  status: 'draft',
  skills: ['JavaScript', 'HTML', 'CSS'],
};

const march1st2023 = 1677628800000;
const march16th2023 = 1678924800000;
const april30th2023 = 1682809200000;
const may31st2023 = 1685487600000;

describe('InvoicesListHelper ', () => {
  it('should set the invoice amount to 25 if the description has 5 words', () => {
    // GIVEN
    const jobAd = <JobAd>{
      ...defaultJobAd,
    };

    // WHEN
    const invoice = buildInvoice(jobAd);

    // THEN
    expect(invoice.amount).toEqual(25);
  });

  it('should set the due date to the end of next month if the invoice date is less than 15th of the month', () => {
    // GIVEN
    const jobAd = <JobAd>{
      ...defaultJobAd,
    };

    MockDate.set(march1st2023);
    const dueDate = new Date(april30th2023);

    // WHEN
    const invoice = buildInvoice(jobAd);

    // THEN
    expect(invoice.dueDate).toEqual(dueDate);
    MockDate.reset();
  });

  it('should set the due date to the end of two months from now if the invoice date is equal or more than 15th of the month', () => {
    // GIVEN
    const jobAd = <JobAd>{
      ...defaultJobAd,
    };

    MockDate.set(march16th2023);
    const dueDate = new Date(may31st2023);

    // WHEN
    const invoice = buildInvoice(jobAd);

    // THEN
    expect(invoice.dueDate).toEqual(dueDate);
    MockDate.reset();
  });
});
