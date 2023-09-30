import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const projectRoutes: Routes = [
  {
    path: '',
    redirectTo: 'jobs-list',
    pathMatch: 'full',
  },
  {
    path: 'jobs-list',
    loadChildren: () => import('./containers/jobs-list/jobs-list.module').then(
        (m) => m.JobsListModule,
      ),
  },
  {
    path: 'job',
    loadChildren: () => import('./containers/job/job.module').then(
      (m) => m.JobModule,
    ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(projectRoutes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
