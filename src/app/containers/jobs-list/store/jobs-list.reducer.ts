import { JobAd, JobsListPageParams } from '../../../models/models';
import { createReducer, on } from '@ngrx/store';
import * as JobsListActions from './jobs-list.actions';

export const jobsListFeatureKey = 'jobsList';

export interface JobsListState {
  jobsList: JobAd[];
  totalCount: number;
  jobListParams: JobsListPageParams;
  error: string;
}

export const initialState: JobsListState = {
  jobsList: [],
  totalCount: 0,
  jobListParams: {
    page: 1,
    pageSize: 10,
  },
  error: '',
};

export const jobsListReducer = createReducer(
  initialState,
  on(JobsListActions.getJobsList, (state) => ({ ...state })),

  on(JobsListActions.getJobsListSuccess, (state, action) => ({
    ...state,
    jobsList: action.jobsListResponse.jobAds,
    totalCount: action.jobsListResponse.totalCount,
  })),

  on(JobsListActions.getJobsListError, (state, action) => ({
    ...state,
    error: action.errorMessage,
  })),
);
