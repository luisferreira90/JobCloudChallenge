import { NgModule } from '@angular/core';

import { JobComponent } from './job.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
  },
];

@NgModule({
  declarations: [JobComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [JobComponent],
})
export class JobModule {}
