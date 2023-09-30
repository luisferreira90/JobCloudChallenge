import { Component, OnInit } from '@angular/core';
import { getJobsList } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobsListPageParams } from '../../models/models';
import { selectJobsList } from './store';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobsList$ = this._jobsListStore.select(selectJobsList);

  jobsListParams: JobsListPageParams = {
    page: 1,
    pageSize: 10,
  };

  constructor(private _jobsListStore: Store) {}

  ngOnInit(): void {
    this._getJobsList();
  }

  private _getJobsList(): void {
    this._jobsListStore.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }
}
