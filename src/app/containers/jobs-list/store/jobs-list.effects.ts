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
          map((jobsList) => deleteJobAdSuccess({ jobsListResponse: jobsList })),
          catchError((error) => of(deleteJobAdError({ errorMessage: error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private jobsListService: JobsListService,
  ) {}
}
