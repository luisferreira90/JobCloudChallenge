import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map } from 'rxjs/operators';
import {
  createInvoice,
  createInvoiceError,
  createInvoiceSuccess,
  deleteInvoiceSuccess,
  getInvoiceByJobAdIdSuccess,
  getInvoicesList,
  getInvoicesListError,
  getInvoicesListSuccess,
} from './invoices-list.actions';
import { of } from 'rxjs';
import { InvoicesListState } from './invoices-list.reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../../../shared/services/api/api.service';
import { buildInvoice } from './invoices-list.helper';
import { deleteJobAdSuccess } from '../../jobs-list/store/jobs-list.actions';

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

  getInvoiceByJobAdId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteJobAdSuccess),
      filter((action) => action.jobAd.status !== 'draft'),
      exhaustMap((action) =>
        this._apiService
          .getInvoiceByJobAdId(action.jobAd.id)
          .pipe(map((invoice) => getInvoiceByJobAdIdSuccess({ invoice: invoice[0] }))),
      ),
    ),
  );

  deleteInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getInvoiceByJobAdIdSuccess),
      exhaustMap((action) =>
        this._apiService.deleteInvoice(action.invoice.id).pipe(map(() => deleteInvoiceSuccess())),
      ),
    ),
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _apiService: ApiService,
    private readonly _store: Store<InvoicesListState>,
  ) {}
}
