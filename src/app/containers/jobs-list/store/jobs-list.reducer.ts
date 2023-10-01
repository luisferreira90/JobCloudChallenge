import { JobAd, JobsListPageParams } from '../../../models/models';
import { createReducer, on } from '@ngrx/store';
import * as JobsListActions from './jobs-list.actions';

export const jobsListFeatureKey = 'jobsList';

export enum JobsListStateActions {
  JOB_LIST_LOADED,
  NO_ACTION,
}

export interface JobsListState {
  jobsList: JobAd[];
  totalCount: number;
  jobListParams: JobsListPageParams;
  action: JobsListStateActions;
  error: string;
}

export const initialState: JobsListState = {
  jobsList: [],
  totalCount: 0,
  jobListParams: {
    page: 1,
    pageSize: 10,
  },
  action: JobsListStateActions.NO_ACTION,
  error: '',
};

export const jobsListReducer = createReducer(
  initialState,
  on(JobsListActions.getJobsList, (state) => ({
    ...state,
    action: JobsListStateActions.NO_ACTION,
  })),

  on(JobsListActions.getJobsListSuccess, (state, action) => ({
    ...state,
    jobsList: action.jobsListResponse.jobAds,
    totalCount: action.jobsListResponse.totalCount,
    action: JobsListStateActions.JOB_LIST_LOADED,
  })),

  on(JobsListActions.getJobsListError, (state, action) => ({
    ...state,
    error: action.errorMessage,
  })),
);
