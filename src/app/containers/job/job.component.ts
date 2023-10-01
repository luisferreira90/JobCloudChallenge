import { Component, OnInit } from '@angular/core';
import { JobStateActions, JobStore } from './store/job.store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JobAd, JobAdStatus } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [JobStore],
})
export class JobComponent implements OnInit {
  jobAd$ = this._jobStore.jobAd$;

  jobAdForm = this._fb.group({
    title: ['', Validators.required],
    description: [''],
    skills: [],
    status: 'draft',
  });

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly _jobStore: JobStore,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this._loadJobAd();
    this._listenToStoreActions();
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // if (value) {
    //   this.jobAdForm.patchValue('skills').push({ name: value });
    // }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeSkill(skill: string) {}

  onSubmit() {
    const jobAd: JobAd = {
      ...this.jobAdForm.getRawValue(),
      id: null,
      status: <JobAdStatus>this.jobAdForm.get('status').value,
    };
    this._jobStore.createJobAd(jobAd);
  }

  private _loadJobAd(): void {
    const jobAdId = this._route.snapshot.params['id'];
    if (jobAdId) {
      this._jobStore.getJobAd(jobAdId);
    }
  }

  private _listenToStoreActions(): void {
    this._jobStore.jobState$.pipe(untilDestroyed(this)).subscribe((state) => {
      switch (state.action) {
        case JobStateActions.JOB_LOADED:
          this._setupForm(state.jobAd);
          break;
        case JobStateActions.JOB_CREATED:
          this._handleJobCreation(state.jobAd);
          break;
        case JobStateActions.JOB_UPDATED:
          this._displayMessage('Job successfully updated');
          break;
      }
    });
  }

  private _handleJobCreation(newJobAd: JobAd): void {
    this._displayMessage('Job successfully created');
    this._router.navigate(['job', newJobAd.id]).then(() => console.log('Navigated to new job'));
  }

  private _displayMessage(message: string) {
    this._snackBar.open(message, 'OK');
  }

  private _setupForm(jobAd: JobAd): void {
    this.jobAdForm.patchValue({ ...jobAd });
  }
}
