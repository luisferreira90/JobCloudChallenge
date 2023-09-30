import {NgModule} from '@angular/core';
import {JobsListComponent} from './jobs-list.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {MatTableModule} from "@angular/material/table";

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent,
  },
];

@NgModule({
  declarations: [
    JobsListComponent
  ],
  imports: [
    RouterOutlet,
    RouterModule.forChild(routes),
    MatTableModule,
  ],
  providers: [],
})
export class JobsListModule { }
