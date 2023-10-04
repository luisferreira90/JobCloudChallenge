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
  let store: MockStore;

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

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should find an element of the list', async () => {
    // GIVEN
    store.overrideSelector(selectJobsList, [{ ...defaultJobAd }, { ...defaultJobAd, id: 2 }]);

    store.refreshState();

    // WHEN
    spectator.component.ngOnInit();
    spectator.detectChanges();

    // Wait for the async operation to complete
    await spectator.fixture.whenStable();

    // THEN

    // THEN
    expect(
      selectJobsListTotalCount.projector({
        ...initialState,
        totalCount: 2,
      }),
    ).toEqual(2);
  });
});
