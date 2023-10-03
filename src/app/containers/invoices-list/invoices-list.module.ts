import { NgModule } from '@angular/core';
import { InvoicesListComponent } from './invoices-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { invoicesListFeatureKey, invoicesListReducer } from './store/invoices-list.reducer';
import { LetDirective } from '@ngrx/component';
import { SnackBarModule } from '../../shared/services/snack-bar/snack-bar.module';
import { TablePaginatorComponent } from '../../shared/components/table-paginator/table-paginator.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesListComponent,
  },
];

@NgModule({
  declarations: [InvoicesListComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    LetDirective,
    SnackBarModule,
    TablePaginatorComponent,
    RouterModule.forChild(routes),
    StoreModule.forFeature(invoicesListFeatureKey, invoicesListReducer),
  ],
})
export class InvoicesListModule {}
