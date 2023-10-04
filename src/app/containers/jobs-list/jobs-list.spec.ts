import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { JobsListComponent } from './jobs-list.component';
import { SnackBarModule } from '../../shared/services/snack-bar/snack-bar.module';
import { JobsListFiltersComponent } from './components/jobs-list-filters/jobs-list-filters.component';
import { JobsListTableComponent } from './components/jobs-list-table/jobs-list-table.component';
import { TablePaginatorComponent } from '../../shared/components/table-paginator/table-paginator.component';
import { LetDirective } from '@ngrx/component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  selectJobsList,
  selectJobsListEvent,
  selectJobsListTotalCount,
} from './store/jobs-list.selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JobsListState, JobsListStateEvents } from './store/jobs-list.reducer';
import { JobAd } from '../../models/models';
import { NoResultsComponent } from '../../shared/components/no-results/no-results.component';

const defaultJobAd = <JobAd>{
  id: 1,
  title: 'Mock title',
  description: 'This is a test description',
  status: 'published',
  skills: ['JavaScript'],
};
describe('JobsListComponent', () => {
  let spectator: Spectator<JobsListComponent>;
  let store: MockStore<JobsListStateEvents>;

  const initialState: JobsListState = {
    jobsList: [],
    totalCount: 0,
    jobsListParams: null,
    error: '',
    event: JobsListStateEvents.NO_EVENT,
  };

  const createComponent = createComponentFactory({
    component: JobsListComponent,
    imports: [
      RouterTestingModule,
      JobsListFiltersComponent,
      JobsListTableComponent,
      TablePaginatorComponent,
      SnackBarModule,
      HttpClientTestingModule,
      LetDirective,
      NoResultsComponent,
    ],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectJobsList,
            value: [],
          },
          {
            selector: selectJobsListTotalCount,
            value: 1,
          },
          {
            selector: selectJobsListEvent,
            value: JobsListStateEvents.NO_EVENT,
          },
        ],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject(MockStore);
  });

  it('should get the correct number of jobs from the store', async () => {
    // GIVEN
    const result = selectJobsList.projector({
      ...initialState,
      jobsList: [{ ...defaultJobAd }, { ...defaultJobAd, id: 2 }, { ...defaultJobAd, id: 3 }],
    });

    // WHEN
    spectator.component.ngOnInit();
    spectator.detectChanges();

    // THEN
    expect(result.length).toEqual(3);
  });

  it('should show the table if we have at least one job ad', async () => {
    // GIVEN
    store.overrideSelector(selectJobsList, [<JobAd>{ id: 1 }]);
    store.refreshState();

    // WHEN
    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    // THEN
    expect(spectator.query('app-jobs-list-table')).toExist();
    expect(spectator.query('app-no-results')).not.toExist();
  });

  it('should show the no results component if we have no job ads', async () => {
    // GIVEN
    store.overrideSelector(selectJobsList, []);
    store.refreshState();

    // WHEN
    spectator.component.ngOnInit();
    spectator.detectComponentChanges();

    // THEN
    expect(spectator.query('app-jobs-list-table')).not.toExist();
    expect(spectator.query('app-no-results')).toExist();
  });
});
