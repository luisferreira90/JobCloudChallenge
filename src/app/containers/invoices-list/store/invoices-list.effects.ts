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
import { of } from 'rxjs';
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

  deleteinvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteInvoice),
      exhaustMap((action) =>
        this._apiService.deleteInvoice(action.id).pipe(
          map(() => deleteInvoiceSuccess()),
          catchError((error) => of(deleteInvoiceError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _apiService: ApiService,
    private readonly _store: Store<InvoicesListState>,
  ) {}
}
