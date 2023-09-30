import { Component, OnInit } from '@angular/core';
import { getJobsList } from './store/jobs-list.actions';
import { Store } from '@ngrx/store';
import { JobsListPageParams } from '../../models/models';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobsListParams: JobsListPageParams = {
    page: 1,
    pageSize: 10,
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this._getJobsList();
  }

  private _getJobsList(): void {
    this.store.dispatch(getJobsList({ params: { ...this.jobsListParams } }));
  }
}
