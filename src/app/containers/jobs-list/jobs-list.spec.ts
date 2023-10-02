import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { JobsListComponent } from './jobs-list.component';
import { SnackBarModule } from '../../shared/services/snack-bar/snack-bar.module';
import { JobsListFiltersComponent } from './components/jobs-list-filters/jobs-list-filters.component';
import { JobsListTableComponent } from './components/jobs-list-table/jobs-list-table.component';
import { TablePaginatorComponent } from '../../shared/components/table-paginator/table-paginator.component';
import { LetDirective } from '@ngrx/component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { selectJobsList, selectJobsListTotalCount } from './store/jobs-list.selectors';

describe('JobsListComponent', () => {
  let spectator: Spectator<JobsListComponent>;
  const createComponent = createComponentFactory({
    component: JobsListComponent,
    imports: [
      RouterTestingModule,
      JobsListFiltersComponent,
      JobsListTableComponent,
      TablePaginatorComponent,
      SnackBarModule,
      LetDirective,
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
            value: 0,
          },
        ],
      }),
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should have a success class by default', () => {
    // GIVEN
    // WHEN
    // THEN
  });
});
