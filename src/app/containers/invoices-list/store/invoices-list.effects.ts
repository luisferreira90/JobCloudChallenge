import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  createInvoice,
  createInvoiceError,
  createInvoiceSuccess,
  deleteInvoice,
  deleteInvoiceError,
  deleteInvoiceSuccess,
  getInvoicesList,
  getInvoicesListError,
  getInvoicesListSuccess,
} from './invoices-list.actions';
import { of, tap } from 'rxjs';
import { InvoicesListState } from './invoices-list.reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../../../shared/services/api/api.service';
import { buildInvoice } from './invoices-list.helper';

@Injectable()
export class InvoicesListEffects {
  loadInvoicesList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getInvoicesList),
      exhaustMap((action) =>
        this._apiService.getInvoicesList(action.params).pipe(
          map((invoicesList) => getInvoicesListSuccess({ invoicesListResponse: invoicesList })),
          catchError((error) => of(getInvoicesListError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  createInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createInvoice),
      exhaustMap((action) => {
        return this._apiService.createInvoice(buildInvoice(action.jobAd)).pipe(
          map((invoice) => createInvoiceSuccess({ invoice })),
          catchError((error) => of(createInvoiceError({ errorMessage: error }))),
        );
      }),
    ),
  );

  deleteInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteInvoice),
      tap((r) => console.log('iside delete effects')),
      exhaustMap((action) => {
        console.log('inside delete invoice effect');
        return this._apiService.getInvoice(action.jobAdId).pipe(
          map((invoice) => {
            console.log(invoice);
            return this._apiService.deleteInvoice(invoice.id).pipe(
              map(() => deleteInvoiceSuccess()),
              catchError((error) => of(deleteInvoiceError({ errorMessage: error }))),
            );
          }),
          map(() => deleteInvoiceSuccess()),
          catchError((error) => of(deleteInvoiceError({ errorMessage: error }))),
        );
      }),
    ),
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _apiService: ApiService,
    private readonly _store: Store<InvoicesListState>,
  ) {}
}
