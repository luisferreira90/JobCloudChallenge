import { NgModule } from '@angular/core';
import { JobsListComponent } from './jobs-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { JobsListEffects } from './store/jobs-list.effects';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { jobsListFeatureKey, jobsListReducer } from './store/jobs-list.reducer';
import { JobsListFiltersComponent } from './components/jobs-list-filters/jobs-list-filters.component';
import { JobsListTableComponent } from './components/jobs-list-table/jobs-list-table.component';
import { TablePaginatorComponent } from '../../shared/components/table-paginator/table-paginator.component';
import { SnackBarModule } from '../../shared/services/snack-bar/snack-bar.module';
import { LetDirective } from '@ngrx/component';

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent,
  },
];

@NgModule({
  declarations: [JobsListComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    JobsListFiltersComponent,
    JobsListTableComponent,
    TablePaginatorComponent,
    SnackBarModule,
    LetDirective,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(JobsListEffects),
    StoreModule.forFeature(jobsListFeatureKey, jobsListReducer),
  ],
})
export class JobsListModule {}
