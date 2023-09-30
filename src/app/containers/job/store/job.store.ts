import { Injectable } from '@angular/core';
import { JobAd } from '../../../models/models';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { JobService } from './job.service';
import { catchError } from 'rxjs/operators';

export interface JobState {
  jobAd: JobAd;
}

@Injectable()
export class JobStore extends ComponentStore<JobState> {
  constructor(private readonly _jobService: JobService) {
    super({ jobAd: <JobAd>{} });
  }

  readonly jobAd$: Observable<JobAd> = this.select((state) => state.jobAd);

  readonly getJobAd = this.effect((jobAdId$: Observable<number>) => {
    return jobAdId$.pipe(
      switchMap((id) =>
        this._jobService.getJob(id).pipe(
          tap({
            next: (jobAd) => this.addJobAd(jobAd),
            error: (e) => this.logError(e),
          }),
          // 👇 Handle potential error within inner pipe.
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  readonly addJobAd = this.updater((state, jobAd: JobAd) => ({
    jobAd: jobAd,
  }));

  logError(error: string) {
    // TODO: Implement method
  }
}
