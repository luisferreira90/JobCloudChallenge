import { JobAd, JobsListPageParams } from '../../../models/models';
import { createReducer, on } from '@ngrx/store';
import * as JobsListActions from './jobs-list.actions';

export const jobsListFeatureKey = 'jobsList';

export enum JobsListStateEvents {
  JOB_LIST_LOADED,
  JOB_DELETED,
  JOB_STATUS_UPDATED,

  ERROR,
  NO_ACTION,
}

export interface JobsListState {
  jobsList: JobAd[];
  totalCount: number;
  jobListParams: JobsListPageParams;
  event: JobsListStateEvents;
  error: string;
}

export const initialState: JobsListState = {
  jobsList: [],
  totalCount: 0,
  jobListParams: {
    page: 1,
    pageSize: 10,
  },
  event: JobsListStateEvents.NO_ACTION,
  error: '',
};

export const jobsListReducer = createReducer(
  initialState,
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
