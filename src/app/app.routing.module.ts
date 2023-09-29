import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const projectRoutes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    loadChildren: () => import('./containers/jobs/jobs.module').then(
        (m) => m.JobsModule,
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
