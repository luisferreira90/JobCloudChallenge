import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
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
