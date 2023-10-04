import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobsListState } from './jobs-list.reducer';

export const featureKey = 'jobsList';

export const selectJobsListState = createFeatureSelector<JobsListState>(featureKey);

export const selectJobsListEvent = createSelector(selectJobsListState, (state) => state.event);

export const selectJobsList = createSelector(selectJobsListState, (state) => state.jobsList);

export const selectJobsListTotalCount = createSelector(
  selectJobsListState,
  (state) => state.totalCount,
);

export const selectJobsListParams = createSelector(
  selectJobsListState,
  (state) => state.jobsListParams,
);

export const selectJobsListPageViewModel = createSelector(
  selectJobsList,
  selectJobsListTotalCount,
  selectJobsListEvent,
  (jobsList, totalCount, action) => ({
    jobsList,
    totalCount,
    action,
  }),
);
