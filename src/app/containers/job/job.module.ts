import { NgModule } from '@angular/core';

import { JobComponent } from './job.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AsyncPipe } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
  },
];

@NgModule({
  declarations: [JobComponent],
  imports: [RouterOutlet, RouterModule.forChild(routes), AsyncPipe],
  providers: [],
  bootstrap: [JobComponent],
})
export class JobModule {}
