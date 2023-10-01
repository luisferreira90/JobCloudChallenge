import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { JobsListService } from './jobs-list.service';
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

@Injectable()
export class JobsListEffects {
  loadJobsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getJobsList),
      exhaustMap((action) =>
        this.jobsListService.getJobsList(action.params).pipe(
          map((jobsList) => getJobsListSuccess({ jobsListResponse: jobsList })),
          catchError((error) => of(getJobsListError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  deleteJobAd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteJobAd),
      exhaustMap((action) =>
        this.jobsListService.deleteJobAd(action.id).pipe(
          map(() => deleteJobAdSuccess()),
          map(() => getJobsList({ params: action.params })),
          catchError((error) => of(deleteJobAdError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  updateJobAdStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateJobAdStatus),
      exhaustMap((action) =>
        this.jobsListService.updateJobAdStatus(action.jobAd).pipe(
          map((jobAd) => updateJobAdStatusSuccess({ jobAd })),
          catchError((error) => of(updateJobAdStatusError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private jobsListService: JobsListService,
  ) {}
}
