import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { JobsComponent } from './jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
  },
];

@NgModule({
  declarations: [
    JobsComponent
  ],
  imports: [
    RouterOutlet,
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: [JobsComponent]
})
export class JobsModule { }
