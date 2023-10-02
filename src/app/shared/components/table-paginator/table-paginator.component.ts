import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BaseListParams } from '../../../models/models';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@UntilDestroy()
@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginatorComponent {
  @Input()
  params: BaseListParams;
  @Input()
  totalCount: number;
  @Output()
  updateParams = new EventEmitter<Partial<BaseListParams>>();

  pageChange(paginationEvent: PageEvent): void {
    const newPageParams = {
      page: paginationEvent.pageIndex,
      pageSize: paginationEvent.pageSize,
    };

    this.updateParams.emit(newPageParams);
  }
}
