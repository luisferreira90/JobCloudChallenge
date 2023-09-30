import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const projectRoutes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./containers/jobs-list/jobs-list.module').then((m) => m.JobsListModule),
  },
  {
    path: 'jobs/:id',
    loadChildren: () => import('./containers/job/job.module').then((m) => m.JobModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(projectRoutes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
