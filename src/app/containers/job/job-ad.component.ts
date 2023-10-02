import { Component, OnInit } from '@angular/core';
import { JobStateActions, JobStore } from './store/job.store';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JobAd } from '../../models/models';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';

@UntilDestroy()
@Component({
  selector: 'app-job',
  templateUrl: './job-ad.component.html',
  styleUrls: ['./job-ad.component.css'],
  providers: [JobStore],
})
export class JobAdComponent implements OnInit {
  jobAd$ = this._jobStore.jobAd$;

  constructor(
    private readonly _jobStore: JobStore,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _snackBarService: SnackBarService,
  ) {}

  ngOnInit() {
    this._loadJobAd();
    this._listenToStoreActions();
  }

  createUpdateJobAd($event: JobAd) {
    this._jobStore.createUpdateJobAd($event);
  }

  private _loadJobAd(): void {
    this._jobStore.getJobAd(this._route.snapshot.params['id']);
  }

  private _listenToStoreActions(): void {
    this._jobStore.jobState$.pipe(untilDestroyed(this)).subscribe((state) => {
      switch (state.action) {
        case JobStateActions.JOB_CREATED:
          this._handleJobCreationSuccess(state.jobAd);
          break;
        case JobStateActions.JOB_UPDATED:
          this._displayMessage('Job successfully updated');
          break;
      }
    });
  }

  private _handleJobCreationSuccess(newJobAd: JobAd): void {
    this._displayMessage('Job successfully created');
    this._router.navigate(['job', newJobAd.id]).then(() => console.log('Navigated to new job'));
  }

  private _displayMessage(message: string) {
    this._snackBarService.displayMessage(message);
  }
}
