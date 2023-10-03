import { createAction, props } from '@ngrx/store';
import { BaseListParams, InvoiceDto, InvoiceListResponse, JobAd } from '../../../models/models';

export const getInvoicesList = createAction(
  '[Invoices List Page] Get Invoices List',
  props<{ params: BaseListParams }>(),
);

export const getInvoicesListSuccess = createAction(
  '[Invoices List Page] Get Invoices List Success',
  props<{ invoicesListResponse: InvoiceListResponse }>(),
);

export const getInvoicesListError = createAction(
  '[Invoices List Page] Get Invoices List Error',
  props<{ errorMessage: string }>(),
);

export const createInvoice = createAction(
  '[Invoices List Page] Create Invoice',
  props<{ jobAd: JobAd }>(),
);

export const createInvoiceSuccess = createAction(
  '[Invoices List Page] Create Invoice Success',
  props<{ invoice: InvoiceDto }>(),
);

export const createInvoiceError = createAction(
  '[Invoices List Page] Create Invoice Error',
  props<{ errorMessage: string }>(),
);

export const deleteInvoice = createAction(
  '[Invoices List Page] Delete Invoice',
  props<{ jobAdId: number }>(),
);

export const deleteInvoiceSuccess = createAction('[Invoices List Page] Delete Invoice Success');

export const deleteInvoiceError = createAction(
  '[Invoices List Page] Delete Invoice Error',
  props<{ errorMessage: string }>(),
);
