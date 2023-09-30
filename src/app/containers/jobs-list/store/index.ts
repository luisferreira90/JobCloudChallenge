import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobsListState } from './jobs-list.reducer';

export const featureKey = 'jobsList';
export const selectJobsListState = createFeatureSelector<JobsListState>(featureKey);
export const selectState = createSelector(selectJobsListState, (state) => state);

export const selectJobsList = createSelector(selectJobsListState, (state) => state?.jobsList);
