import { Component, OnInit } from '@angular/core';
import { deleteJobAd, getJobsList, updateJobAdStatus } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobAd, JobsListPageParams } from '../../models/models';
import { selectJobsListAction, selectJobsListPageViewModel } from './store/jobs-list.selector';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JobsListStateEvents } from './store/jobs-list.reducer';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';

@UntilDestroy()
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  readonly vm$ = this._jobsListStore.select(selectJobsListPageViewModel);
  readonly action$ = this._jobsListStore.select(selectJobsListAction);

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

  deleteJobAd(id: number) {
    this._jobsListStore.dispatch(deleteJobAd({ id, params: this.jobsListParams }));
  }

  private _getJobsList(): void {
    this._jobsListStore.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }

  private _listenToStoreActions(): void {
    this.action$.pipe(untilDestroyed(this)).subscribe((action) => {
      switch (action) {
        case JobsListStateEvents.JOB_LIST_LOADED:
          break;
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
