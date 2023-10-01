import { NgModule } from '@angular/core';
import { JobsListComponent } from './jobs-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { JobsListEffects } from './store/jobs-list.effects';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { jobsListFeatureKey, jobsListReducer } from './store/jobs-list.reducer';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JobsListFiltersComponent } from './components/jobs-list-filters/jobs-list-filters.component';
import { JobsListTableComponent } from './components/jobs-list-table/jobs-list-table.component';

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
    MatPaginatorModule,
    JobsListFiltersComponent,
    JobsListTableComponent,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(JobsListEffects),
    StoreModule.forFeature(jobsListFeatureKey, jobsListReducer),
  ],
})
export class JobsListModule {}
