import { Component, OnInit } from '@angular/core';
import { getJobsList } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobsListPageParams } from '../../models/models';
import { selectJobsList, selectJobsListAction, selectJobsListTotalCount } from './store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, Subject } from 'rxjs';
import { JobsListStateActions } from './store/jobs-list.reducer';

@UntilDestroy()
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobsList$ = this._jobsListStore.select(selectJobsList);
  totalCount$ = this._jobsListStore.select(selectJobsListTotalCount);
  action$ = this._jobsListStore.select(selectJobsListAction);
  isLoading$ = new Subject<boolean>();

  jobsListParams: JobsListPageParams = {
    page: 0,
    pageSize: 10,
  };

  constructor(private _jobsListStore: Store) {}

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

  private _getJobsList(): void {
    this.isLoading$.next(true);
    this._jobsListStore.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }

  private _listenToStoreActions(): void {
    this.action$
      .pipe(
        untilDestroyed(this),
        filter((action) => action === JobsListStateActions.JOB_LIST_LOADED),
      )
      .subscribe((r) => {
        this.isLoading$.next(false);
      });
  }
}
