import { NgModule } from '@angular/core';
import { JobsListComponent } from './jobs-list.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { JobsListService } from './store/jobs-list.service';
import { EffectsModule } from '@ngrx/effects';
import { JobsListEffects } from './store/jobs-list.effects';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { jobsListFeatureKey, jobsListReducer } from './store/jobs-list.reducer';

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent,
  },
];

@NgModule({
  declarations: [JobsListComponent],
  imports: [
    RouterOutlet,
    RouterModule.forChild(routes),
    MatTableModule,
    EffectsModule.forFeature(JobsListEffects),
    StoreModule.forFeature(jobsListFeatureKey, jobsListReducer),
    AsyncPipe,
    JsonPipe,
  ],
  providers: [JobsListService],
})
export class JobsListModule {}
