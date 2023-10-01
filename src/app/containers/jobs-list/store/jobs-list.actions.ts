import { createAction, props } from '@ngrx/store';
import { JobAd, JobAdsListResponse, JobsListPageParams } from '../../../models/models';

export const getJobsList = createAction(
  '[Jobs List Page] Get Jobs List',
  props<{ params: JobsListPageParams }>(),
);

export const getJobsListSuccess = createAction(
  '[Jobs List Page] Get Jobs List Success',
  props<{ jobsListResponse: JobAdsListResponse }>(),
);

export const getJobsListError = createAction(
  '[Jobs List Page] Get Jobs List Error',
  props<{ errorMessage: string }>(),
);

export const deleteJobAd = createAction('[Jobs List Page] Delete Job Ad', props<{ id: number }>());

export const deleteJobAdSuccess = createAction('[Jobs List Page] Delete Job Ad Success');

export const deleteJobAdError = createAction(
  '[Jobs List Page] Delete Job Ad Error',
  props<{ errorMessage: string }>(),
);

export const updateJobAdStatus = createAction(
  '[Jobs List Page] Update Job Ad Status Job Ad',
  props<{ jobAd: JobAd }>(),
);

export const updateJobAdStatusSuccess = createAction(
  '[Jobs List Page] Update Job Ad Status Job Ad Success',
  props<{ jobAd: JobAd }>(),
);

export const updateJobAdStatusError = createAction(
  '[Jobs List Page] Update Job Ad Status Job Ad Error',
  props<{ errorMessage: string }>(),
);
