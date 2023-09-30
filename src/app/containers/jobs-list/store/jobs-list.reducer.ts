import { JobAd, JobsListPageParams } from '../../../models/models';
import { createReducer, on } from '@ngrx/store';
import * as JobsListActions from './jobs-list.actions';

export interface State {
  jobsList: JobAd[];
  jobListParams: JobsListPageParams;
}

export const initialState: State = {
  jobsList: [],
  jobListParams: {
    page: 1,
    pageSize: 10,
  },
};

export const scoreboardReducer = createReducer(
  initialState,
  on(JobsListActions.getJobsList, (state) => ({ ...state, jobsList: [] })),
);
