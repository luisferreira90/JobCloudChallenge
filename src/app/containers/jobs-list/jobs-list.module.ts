import { NgModule } from '@angular/core';
import { JobsListComponent } from './jobs-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { JobsListService } from './store/jobs-list.service';
import { EffectsModule } from '@ngrx/effects';
import { JobsListEffects } from './store/jobs-list.effects';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { jobsListFeatureKey, jobsListReducer } from './store/jobs-list.reducer';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatTableModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(JobsListEffects),
    StoreModule.forFeature(jobsListFeatureKey, jobsListReducer),
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [JobsListService],
})
export class JobsListModule {}
