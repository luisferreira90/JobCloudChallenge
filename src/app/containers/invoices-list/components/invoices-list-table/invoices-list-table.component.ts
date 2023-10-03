import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { InvoiceDto } from '../../../../models/models';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-invoices-list-table',
  templateUrl: './invoices-list-table.component.html',
  styleUrls: ['./invoices-list-table.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesListTableComponent {
  @Input()
  invoicesList: InvoiceDto[];

  displayedColumns: string[] = ['id', 'jobAdId', 'amount', 'dueDate'];
}
