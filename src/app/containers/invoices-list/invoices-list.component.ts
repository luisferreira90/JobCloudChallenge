import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectinvoicesListPageViewModel } from './store/invoices-list.selectors';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';
import { BaseListParams } from '../../models/models';
import { getInvoicesList } from './store/invoices-list.actions';

@UntilDestroy()
@Component({
  selector: 'app-invoices-list-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css'],
})
export class InvoicesListComponent implements OnInit {
  readonly vm$ = this._invoicesListStore.select(selectinvoicesListPageViewModel);

  invoicesListParams: BaseListParams = {
    page: 0,
    pageSize: 10,
  };

  constructor(
    private readonly _invoicesListStore: Store,
    private readonly _snackBarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this._getinvoicesList();
  }

  updateParams(params: Partial<BaseListParams>): void {
    this.invoicesListParams = {
      ...this.invoicesListParams,
      ...params,
    };

    this._getinvoicesList();
  }

  private _getinvoicesList(): void {
    this._invoicesListStore.dispatch(getInvoicesList({ params: { ...this.invoicesListParams } }));
  }
}
