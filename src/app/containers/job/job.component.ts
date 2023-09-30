import { Component, OnInit } from '@angular/core';
import { JobStore } from './store/job.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [JobStore],
})
export class JobComponent implements OnInit {
  jobAd$ = this.jobStore.jobAd$;

  constructor(
    private readonly jobStore: JobStore,
    private readonly _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.jobStore.getJobAd(this._route.snapshot.params['id']);
  }
}
