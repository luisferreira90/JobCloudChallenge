import { createAction, props } from '@ngrx/store';
import { JobAdsListResponse, JobsListPageParams } from '../../../models/models';

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

export const deleteJobAdSuccess = createAction(
  '[Jobs List Page] Delete Job Ad Success',
  props<{ jobsListResponse: JobAdsListResponse }>(),
);

export const deleteJobAdError = createAction(
  '[Jobs List Page] Delete Job Ad Error',
  props<{ errorMessage: string }>(),
);
