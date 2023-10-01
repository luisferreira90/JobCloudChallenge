import { Component, OnInit } from '@angular/core';
import { getJobsList } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobsListPageParams } from '../../models/models';
import { selectJobsList, selectJobsListTotalCount } from './store';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobsList$ = this._jobsListStore.select(selectJobsList);
  totalCount$ = this._jobsListStore.select(selectJobsListTotalCount);
  displayedColumns: string[] = ['id', 'title', 'status', 'options'];

  jobsListParams: JobsListPageParams = {
    page: 1,
    pageSize: 10,
  };

  constructor(private _jobsListStore: Store) {}

  ngOnInit(): void {
    this._getJobsList();
  }

  sortChange(sortEvent: Sort): void {
    if (sortEvent.direction) {
      this.jobsListParams = {
        ...this.jobsListParams,
        sort: sortEvent.active,
        order: sortEvent.direction,
      };
    } else {
      this.jobsListParams = {
        ...this.jobsListParams,
        sort: undefined,
        order: undefined,
      };
    }

    this._getJobsList();
  }

  pageChange(paginationEvent: PageEvent): void {
    this.jobsListParams = {
      ...this.jobsListParams,
      page: paginationEvent.pageIndex,
      pageSize: paginationEvent.pageSize,
    };

    this._getJobsList();
  }

  private _getJobsList(): void {
    this._jobsListStore.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }
}
