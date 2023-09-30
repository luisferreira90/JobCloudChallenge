import { Component } from '@angular/core';
import {JobsListService} from "./store/jobs-list.service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent {
  constructor(private readonly _jobsService: JobsListService) {
    console.log("here");
    this._jobsService.getJobsList().subscribe(r =>console.log(r));
  }
}
