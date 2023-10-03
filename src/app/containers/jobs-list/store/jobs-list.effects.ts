import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  deleteJobAd,
  deleteJobAdError,
  deleteJobAdSuccess,
  getJobsList,
  getJobsListError,
  getJobsListSuccess,
  updateJobAdStatus,
  updateJobAdStatusError,
  updateJobAdStatusSuccess,
} from './jobs-list.actions';
import { of } from 'rxjs';
import { JobsListState } from './jobs-list.reducer';
import { Store } from '@ngrx/store';
import { selectJobsListParams } from './jobs-list.selectors';
import { ApiService } from '../../../shared/services/api/api.service';
import { createInvoice, deleteInvoice } from '../../invoices-list/store/invoices-list.actions';

@Injectable()
export class JobsListEffects {
  loadJobsList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getJobsList),
      exhaustMap((action) =>
        this._apiService.getJobsList(action.params).pipe(
          map((jobsList) => getJobsListSuccess({ jobsListResponse: jobsList })),
          catchError((error) => of(getJobsListError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  deleteJobAd$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteJobAd),
      exhaustMap((action) =>
        this._apiService.deleteJobAd(action.jobAd.id).pipe(
          map((response) => deleteInvoice({ jobAdId: action.jobAd.id })),
          // map((response) => {
          //   if (action.jobAd.status !== 'draft') {
          //     console.log('The invoice will have to be deleted');
          //     return deleteInvoice({ jobAdId: action.jobAd.id });
          //   }
          //   return response;
          // }),
          map(() => deleteJobAdSuccess()),
          concatLatestFrom(() => this._store.select(selectJobsListParams)),
          map(([action, jobsListParams]) => getJobsList({ params: jobsListParams })),
          catchError((error) => of(deleteJobAdError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  updateJobAdStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateJobAdStatus),
      exhaustMap((action) =>
        this._apiService.updateJob(action.jobAd).pipe(
          map((jobAd) => updateJobAdStatusSuccess({ jobAd })),
          map((response) => {
            const jobAd = response.jobAd;
            if (response.jobAd.status === 'published') {
              return createInvoice({ jobAd });
            }
            return response;
          }),
          catchError((error) => of(updateJobAdStatusError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _apiService: ApiService,
    private readonly _store: Store<JobsListState>,
  ) {}
}
