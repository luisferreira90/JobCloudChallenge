import { Injectable } from '@angular/core';
import { JobAd, JobAdDto } from '../../../models/models';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api/api.service';
import { createInvoice } from '../../invoices-list/store/invoices-list.actions';
import { Store } from '@ngrx/store';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';

export const DEFAULT_JOB_AD = <JobAdDto>{
  id: null,
  title: '',
  description: '',
  status: 'draft',
  skills: [],
  createdAt: null,
  updatedAt: null,
  _embedded: '',
};

export enum JobStateEvents {
  JOB_LOADED,
  JOB_CREATED,
  JOB_UPDATED,
  NO_EVENT,
}

export interface JobState {
  jobAd: JobAdDto;
  event: JobStateEvents;
}

interface JobAdUpdaterParams {
  jobAd: JobAdDto;
  event: JobStateEvents;
}

@Injectable()
export class JobAdStore extends ComponentStore<JobState> {
  readonly jobState$: Observable<JobState> = this.select((state) => state);
  readonly jobAd$: Observable<JobAdDto> = this.select((state) => state.jobAd);
  readonly updaterJobAd = this.updater((state, params: JobAdUpdaterParams) => ({
    ...state,
    jobAd: params.jobAd,
    event: params.event,
  }));

  readonly getJobAd = this.effect((jobAdId$: Observable<number>) => {
    return jobAdId$.pipe(
      switchMap((id) => {
        if (!id) {
          this.updaterJobAd({
            jobAd: DEFAULT_JOB_AD,
            event: JobStateEvents.JOB_LOADED,
          });
          return of(DEFAULT_JOB_AD);
        }
        return this._apiService.getJob(id).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, event: JobStateEvents.JOB_LOADED }),
            error: (e) => this.logError(e),
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  readonly createUpdateJobAd = this.effect((newJobAd$: Observable<Partial<JobAdDto>>) => {
    return newJobAd$.pipe(
      switchMap((jobAd) => {
        if (jobAd.id) {
          return this._apiService.updateJob(jobAd).pipe(
            tap({
              next: (jobAd) => this.updaterJobAd({ jobAd, event: JobStateEvents.JOB_UPDATED }),
              error: (e) => this.logError(e),
            }),
            tap((jobAd) => this.notificationHandler(jobAd, `Job #${jobAd.id} updated`)),
            catchError(() => EMPTY),
          );
        }

        return this._apiService.createJob(jobAd).pipe(
          tap({
            next: (jobAd) => this.updaterJobAd({ jobAd, event: JobStateEvents.JOB_CREATED }),
            error: (e) => this.logError(e),
          }),
          tap((jobAd) => this.notificationHandler(jobAd, `Job Ad created with ID #${jobAd.id}`)),
          catchError(() => EMPTY),
        );
      }),
      map((jobAd) => {
        if (jobAd.status === 'published') {
          this._store.dispatch(createInvoice({ jobAd }));
        }
      }),
    );
  });

  constructor(
    private readonly _apiService: ApiService,
    private readonly _store: Store,
    private readonly _notificationsService: NotificationsService,
  ) {
    super({ jobAd: DEFAULT_JOB_AD, event: JobStateEvents.NO_EVENT });
  }

  logError(error: string) {
    return error;
  }

  notificationHandler(jobAd: JobAd, body: string) {
    return this._notificationsService.createNotification({
      title: `${jobAd.title}`,
      body: `${body}`,
    });
  }
}
