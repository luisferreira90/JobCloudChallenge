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
import { ApiService } from '../../shared/services/api/api.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JobsListComponent', () => {
  let spectator: Spectator<JobsListComponent>;
  let apiService: ApiService;

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
    ],
    providers: [
      provideMockStore({
        selectors: [
          {
            selector: selectJobsList,
            value: [
              {
                id: 1,
                title: 'Web Dev',
                status: 'draft',
              },
            ],
          },
          {
            selector: selectJobsListTotalCount,
            value: 1,
          },
        ],
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    apiService = spectator.inject(ApiService);
  });

  it('should find an element of the list', () => {
    // GIVEN
    jest.spyOn(apiService, 'getJobsList').mockReturnValue(
      of({
        jobAds: [
          {
            id: 1,
            title: 'Web Dev',
            description: 'Test description',
            status: 'draft',
            skills: ['JavaScript'],
          },
        ],
        totalCount: 1,
      }),
    );

    // WHEN
    spectator.component.ngOnInit();

    // THEN
    spectator.component.vm$.subscribe((data) => {
      console.log(data);
      expect(data.totalCount).toEqual(0);
    });
  });
});
