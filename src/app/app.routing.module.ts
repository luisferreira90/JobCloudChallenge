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
    path: 'job',
    loadChildren: () => import('./containers/job/job-ad.module').then((m) => m.JobAdModule),
  },
  {
    path: 'job/:id',
    loadChildren: () => import('./containers/job/job-ad.module').then((m) => m.JobAdModule),
  },
  {
    path: 'invoices-list',
    loadChildren: () =>
      import('./containers/invoices-list/invoices-list.module').then((m) => m.InvoicesListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(projectRoutes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
