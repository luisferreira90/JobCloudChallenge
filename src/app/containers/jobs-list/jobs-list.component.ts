import { Component, OnInit } from '@angular/core';
import { deleteJobAd, getJobsList, updateJobAdStatus } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobAd, JobsListPageParams } from '../../models/models';
import { selectJobsListPageViewModel } from './store/jobs-list.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JobsListStateEvents } from './store/jobs-list.reducer';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  readonly vm$ = this._jobsListStore.select(selectJobsListPageViewModel);

  jobsListParams: JobsListPageParams = {
    page: 0,
    pageSize: 10,
  };

  constructor(
    private readonly _jobsListStore: Store,
    private readonly _snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this._getJobsList();
    this._listenToStoreActions();
  }

  updateParams(params: Partial<JobsListPageParams>): void {
    this.jobsListParams = {
      ...this.jobsListParams,
      ...params,
    };

    this._getJobsList();
  }

  changeJobAdStatus(jobAd: JobAd): void {
    this._jobsListStore.dispatch(updateJobAdStatus({ jobAd }));
  }

  deleteJobAd(jobAd: JobAd) {
    this._jobsListStore.dispatch(deleteJobAd({ jobAd }));
  }

  private _getJobsList(): void {
    this._jobsListStore.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }

  private _listenToStoreActions(): void {
    this.vm$
      .pipe(
        untilDestroyed(this),
        map((vm) => vm.action),
      )
      .subscribe((action) => {
        switch (action) {
          case JobsListStateEvents.JOB_DELETED:
            this._snackBarService.displayMessage('Job Ad deleted');
            break;
          case JobsListStateEvents.ERROR:
            this._snackBarService.displayMessage('An error as occurred');
            break;
          case JobsListStateEvents.JOB_STATUS_UPDATED:
            this._snackBarService.displayMessage('Job Ad status updated successfully');
            break;
        }
      });
  }
}
