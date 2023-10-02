import { NgModule } from '@angular/core';

import { JobAdComponent } from './job-ad.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { SnackBarModule } from '../../shared/services/snack-bar/snack-bar.module';
import { JobAdFormComponent } from './components/job-ad-form/job-ad-form.component';

const routes: Routes = [
  {
    path: '',
    component: JobAdComponent,
  },
];

@NgModule({
  declarations: [JobAdComponent],
  imports: [
    CommonModule,
    SnackBarModule,
    LetDirective,
    JobAdFormComponent,
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: [JobAdComponent],
})
export class JobAdModule {}
