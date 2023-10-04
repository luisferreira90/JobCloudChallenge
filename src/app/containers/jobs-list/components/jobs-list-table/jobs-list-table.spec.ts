import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { JobsListTableComponent } from './jobs-list-table.component';

describe('JobsListTableComponent ', () => {
  let spectator: Spectator<JobsListTableComponent>;

  const createComponent = createComponentFactory({
    component: JobsListTableComponent,
    imports: [
      MatSortModule,
      MatTableModule,
      RouterLink,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should update the params when sorting', () => {
    // GIVEN
    const spy = jest.spyOn(spectator.component.updateParams, 'emit');

    const sortOptions = <Sort>{
      active: 'title',
      direction: 'asc',
    };

    // WHEN
    spectator.component.sortChange(sortOptions);

    // THEN
    expect(spy).toHaveBeenCalledWith({ sort: 'title', order: 'asc', page: 0 });
  });

  it('should update the params when sorting', () => {
    // GIVEN
    const spy = jest.spyOn(spectator.component.updateParams, 'emit');

    const sortOptions = <Sort>{
      active: 'title',
      direction: 'asc',
    };

    // WHEN
    spectator.component.sortChange(sortOptions);

    // THEN
    expect(spy).toHaveBeenCalledWith({ sort: 'title', order: 'asc', page: 0 });
  });

  it('should use the default sort params if no direction is selected', () => {
    // GIVEN
    const spy = jest.spyOn(spectator.component.updateParams, 'emit');

    const sortOptions = <Sort>{
      active: 'title',
      direction: null,
    };

    // WHEN
    spectator.component.sortChange(sortOptions);

    // THEN
    expect(spy).toHaveBeenCalledWith({ sort: null, order: null, page: 0 });
  });
});
