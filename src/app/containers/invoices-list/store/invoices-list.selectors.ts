import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoicesListState } from './invoices-list.reducer';

export const featureKey = 'invoicesList';

export const selectinvoicesListState = createFeatureSelector<InvoicesListState>(featureKey);

export const selectinvoicesListAction = createSelector(
  selectinvoicesListState,
  (state) => state.event,
);

export const selectinvoicesList = createSelector(
  selectinvoicesListState,
  (state) => state.invoicesList,
);

export const selectinvoicesListTotalCount = createSelector(
  selectinvoicesListState,
  (state) => state.totalCount,
);

export const selectinvoicesListParams = createSelector(
  selectinvoicesListState,
  (state) => state.invoicesListParams,
);

export const selectinvoicesListPageViewModel = createSelector(
  selectinvoicesList,
  selectinvoicesListTotalCount,
  (invoicesList, totalCount) => ({
    invoicesList,
    totalCount,
  }),
);
