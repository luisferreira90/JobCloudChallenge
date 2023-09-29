import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JobComponent } from './job.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
  },
];

@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    RouterOutlet,
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: [JobComponent]
})
export class JobModule { }
