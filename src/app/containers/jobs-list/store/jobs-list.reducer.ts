import { JobAd, JobsListPageParams } from '../../../models/models';
import { createReducer, on } from '@ngrx/store';
import * as JobsListActions from './jobs-list.actions';

export const jobsListFeatureKey = 'jobsList';

export enum JobsListStateEvents {
  JOB_LIST_LOADED,
  JOB_DELETED,
  JOB_STATUS_UPDATED,

  ERROR,
  NO_EVENT,
}

export interface JobsListState {
  jobsList: JobAd[];
  totalCount: number;
  jobsListParams: JobsListPageParams;
  event: JobsListStateEvents;
  error: string;
}

export const initialState: JobsListState = {
  jobsList: [],
  totalCount: 0,
  jobsListParams: {
    page: 1,
    pageSize: 10,
  },
  event: JobsListStateEvents.NO_EVENT,
  error: '',
};

export const jobsListReducer = createReducer(
  initialState,
  on(JobsListActions.getJobsList, (state, action) => ({
    ...state,
    jobsListParams: action.params,
  })),

  on(JobsListActions.getJobsListSuccess, (state, action) => ({
    ...state,
    jobsList: action.jobsListResponse.jobAds,
    totalCount: action.jobsListResponse.totalCount,
    event: JobsListStateEvents.JOB_LIST_LOADED,
  })),

  on(JobsListActions.getJobsListError, (state, action) => ({
    ...state,
    error: action.errorMessage,
    event: JobsListStateEvents.ERROR,
  })),

  on(JobsListActions.deleteJobAdSuccess, (state, action) => ({
    ...state,
    event: JobsListStateEvents.JOB_DELETED,
  })),

  on(JobsListActions.deleteJobAdError, (state, action) => ({
    ...state,
    event: JobsListStateEvents.ERROR,
  })),

  on(JobsListActions.updateJobAdStatusSuccess, (state, action) => ({
    ...state,
    event: JobsListStateEvents.JOB_STATUS_UPDATED,
  })),

  on(JobsListActions.updateJobAdStatusError, (state, action) => ({
    ...state,
    event: JobsListStateEvents.ERROR,
  })),
);
