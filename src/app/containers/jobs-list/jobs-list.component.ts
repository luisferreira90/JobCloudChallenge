import { Component, OnInit } from '@angular/core';
import { getJobsList } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobAdStatus, JobsListPageParams } from '../../models/models';
import { selectJobsList, selectJobsListTotalCount } from './store';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobsList$ = this._jobsListStore.select(selectJobsList);
  totalCount$ = this._jobsListStore.select(selectJobsListTotalCount);
  displayedColumns: string[] = ['id', 'title', 'status', 'options'];
  searchQuery = new FormControl('');
  statusFilter = new FormControl('');

  jobsListParams: JobsListPageParams = {
    page: 0,
    pageSize: 10,
  };

  constructor(private _jobsListStore: Store) {}

  ngOnInit(): void {
    this._getJobsList();
    this._listenToSearchQuery();
    this._listenToStatusFilter();
  }

  sortChange(sortEvent: Sort): void {
    if (sortEvent.direction) {
      this.jobsListParams = {
        ...this.jobsListParams,
        sort: sortEvent.active,
        order: sortEvent.direction,
        page: 0,
      };
    } else {
      this.jobsListParams = {
        ...this.jobsListParams,
        sort: undefined,
        order: undefined,
        page: 0,
      };
    }

    this._getJobsList();
  }

  pageChange(paginationEvent: PageEvent): void {
    this.jobsListParams = {
      ...this.jobsListParams,
      // json-server pages start at 1, while Angular Material's Paginator starts at 0, hence the +1
      page: paginationEvent.pageIndex + 1,
      pageSize: paginationEvent.pageSize,
    };

    this._getJobsList();
  }

  filterByStatus(event: any) {
    console.log(event);
  }

  private _listenToSearchQuery(): void {
    this.searchQuery.valueChanges
      .pipe(untilDestroyed(this), debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.jobsListParams = {
          ...this.jobsListParams,
          query: query || '',
        };
        this._getJobsList();
      });
  }

  private _listenToStatusFilter(): void {
    this.statusFilter.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((status) => {
        this.jobsListParams = {
          ...this.jobsListParams,
          status: <JobAdStatus>status || '',
        };
        this._getJobsList();
      });
  }

  private _getJobsList(): void {
    this._jobsListStore.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }
}
