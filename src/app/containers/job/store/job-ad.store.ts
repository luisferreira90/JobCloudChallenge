import { Injectable } from '@angular/core';
import { JobAd } from '../../../models/models';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api/api.service';

export const DEFAULT_JOB_AD = <JobAd>{
  id: null,
  title: '',
  description: '',
  status: 'draft',
  skills: [],
};

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
export class JobAdStore extends ComponentStore<JobState> {
  readonly jobState$: Observable<JobState> = this.select((state) => state);
  readonly jobAd$: Observable<JobAd> = this.select((state) => state.jobAd);
  readonly updaterJobAd = this.updater((state, params: JobAdUpdaterParams) => ({
    ...state,
    jobAd: params.jobAd,
    action: params.action,
  }));

  readonly getJobAd = this.effect((jobAdId$: Observable<number>) => {
    return jobAdId$.pipe(
      switchMap((id) => {
        if (!id) {
          this.updaterJobAd({
            jobAd: DEFAULT_JOB_AD,
            action: JobStateActions.JOB_LOADED,
          });
          return of(DEFAULT_JOB_AD);
        }
        return this._apiService.getJob(id).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, action: JobStateActions.JOB_LOADED }),
            error: (e) => this.logError(e),
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  readonly createUpdateJobAd = this.effect((newJobAd$: Observable<Partial<JobAd>>) => {
    return newJobAd$.pipe(
      switchMap((jobAd) => {
        if (jobAd.id) {
          return this._apiService.updateJob(jobAd).pipe(
            tap({
              next: (jobAd) => this.updaterJobAd({ jobAd, action: JobStateActions.JOB_UPDATED }),
              error: (e) => this.logError(e),
            }),
            catchError(() => EMPTY),
          );
        }

        return this._apiService.createJob(jobAd).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, action: JobStateActions.JOB_CREATED }),
            error: (e) => this.logError(e),
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  constructor(private readonly _apiService: ApiService) {
    super({ jobAd: DEFAULT_JOB_AD, action: JobStateActions.NO_ACTION });
  }

  logError(error: string) {
    return error;
  }
}
