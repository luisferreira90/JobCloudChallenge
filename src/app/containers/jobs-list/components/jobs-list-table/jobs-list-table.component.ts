import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JobAd, JobsListPageParams } from '../../../../models/models';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

const DEFAULT_SORT: Partial<JobsListPageParams> = {
  sort: undefined,
  order: undefined,
  page: 0,
};

@UntilDestroy()
@Component({
  selector: 'app-jobs-list-table',
  templateUrl: './jobs-list-table.component.html',
  styleUrls: ['./jobs-list-table.component.css'],
  standalone: true,
  imports: [CommonModule, MatSortModule, MatTableModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListTableComponent {
  @Input()
  jobsList: JobAd[];
  @Input()
  jobsListParams: JobsListPageParams;
  @Output()
  updateParams = new EventEmitter<Partial<JobsListPageParams>>();

  displayedColumns: string[] = ['id', 'title', 'status', 'options'];

  sortChange(sortEvent: Sort): void {
    const newSort: Partial<JobsListPageParams> = sortEvent.direction
      ? {
          sort: sortEvent.active,
          order: sortEvent.direction,
        }
      : DEFAULT_SORT;

    newSort.page = 0;

    this.updateParams.emit(newSort);
  }
}
