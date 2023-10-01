import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JobsListPageParams } from '../../../../models/models';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@UntilDestroy()
@Component({
  selector: 'app-jobs-list-paginator',
  templateUrl: './jobs-list-paginator.component.html',
  styleUrls: ['./jobs-list-paginator.component.css'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListPaginatorComponent {
  @Input()
  jobsListParams: JobsListPageParams;
  @Input()
  totalCount: number;
  @Input()
  isLoading = false;
  @Output()
  updateParams = new EventEmitter<Partial<JobsListPageParams>>();

  pageChange(paginationEvent: PageEvent): void {
    const newPageParams = {
      // json-server pages start at 1, while Angular Material's Paginator starts at 0, hence the +1
      page: paginationEvent.pageIndex + 1,
      pageSize: paginationEvent.pageSize,
    };

    this.updateParams.emit(newPageParams);
  }
}
