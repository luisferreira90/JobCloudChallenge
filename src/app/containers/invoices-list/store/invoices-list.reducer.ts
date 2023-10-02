import { createReducer, on } from '@ngrx/store';
import * as InvoicesListActions from './invoices-list.actions';
import { BaseListParams, Invoice } from '../../../models/models';

export const invoicesListFeatureKey = 'invoicesList';

export enum InvoicesListStateEvents {
  INVOICE_LIST_LOADED,
  INVOICE_DELETED,
  INVOICE_STATUS_UPDATED,

  ERROR,
  NO_ACTION,
}

export interface InvoicesListState {
  invoicesList: Invoice[];
  totalCount: number;
  invoicesListParams: BaseListParams;
  event: InvoicesListStateEvents;
  error: string;
}

export const initialState: InvoicesListState = {
  invoicesList: [],
  totalCount: 0,
  invoicesListParams: {
    page: 1,
    pageSize: 10,
  },
  event: InvoicesListStateEvents.NO_ACTION,
  error: '',
};

export const invoicesListReducer = createReducer(
  initialState,
  on(InvoicesListActions.getInvoicesList, (state, action) => ({
    ...state,
    invoicesListParams: action.params,
  })),

  on(InvoicesListActions.getInvoicesListSuccess, (state, action) => ({
    ...state,
    invoicesList: action.invoicesListResponse.invoices,
    totalCount: action.invoicesListResponse.totalCount,
    event: InvoicesListStateEvents.INVOICE_LIST_LOADED,
  })),

  on(InvoicesListActions.getInvoicesListError, (state, action) => ({
    ...state,
    error: action.errorMessage,
    event: InvoicesListStateEvents.ERROR,
  })),

  on(InvoicesListActions.deleteInvoiceSuccess, (state, action) => ({
    ...state,
    event: InvoicesListStateEvents.INVOICE_DELETED,
  })),

  on(InvoicesListActions.deleteInvoiceError, (state, action) => ({
    ...state,
    event: InvoicesListStateEvents.ERROR,
  })),
);
