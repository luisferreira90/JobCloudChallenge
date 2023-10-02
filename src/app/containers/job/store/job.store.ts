import { Injectable } from '@angular/core';
import { JobAd } from '../../../models/models';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api/api.service';

export enum JobStateActions {
  JOB_LOADED,
  JOB_CREATED,
  JOB_DELETED,
  JOB_UPDATED,
  NO_ACTION,
}

export interface JobState {
  jobAd: JobAd;
  action: JobStateActions;
}

interface JobAdUpdaterParams {
  jobAd: JobAd;
  action: JobStateActions;
}

@Injectable()
export class JobStore extends ComponentStore<JobState> {
  readonly jobState$: Observable<JobState> = this.select((state) => state);
  readonly jobAction$: Observable<JobStateActions> = this.select((state) => state.action);
  readonly jobAd$: Observable<JobAd> = this.select((state) => state.jobAd);
  readonly updaterJobAd = this.updater((state, params: JobAdUpdaterParams) => ({
    ...state,
    jobAd: params.jobAd,
    action: params.action,
  }));
  readonly getJobAd = this.effect((jobAdId$: Observable<number>) => {
    return jobAdId$.pipe(
      switchMap((id) =>
        this._apiService.getJob(id).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, action: JobStateActions.JOB_LOADED }),
            error: (e) => this.logError(e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  readonly createJobAd = this.effect((newJobAd$: Observable<Partial<JobAd>>) => {
    return newJobAd$.pipe(
      switchMap((newJobAd) =>
        this._apiService.createJob(newJobAd).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, action: JobStateActions.JOB_CREATED }),
            error: (e) => this.logError(e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  readonly updateJobAd = this.effect((updatedJobAd$: Observable<Partial<JobAd>>) => {
    return updatedJobAd$.pipe(
      switchMap((updatedJobAd) =>
        this._apiService.updateJob(updatedJobAd).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, action: JobStateActions.JOB_UPDATED }),
            error: (e) => this.logError(e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  constructor(private readonly _apiService: ApiService) {
    super({ jobAd: <JobAd>{}, action: JobStateActions.NO_ACTION });
  }

  logError(error: string) {
    return error;
  }
}
