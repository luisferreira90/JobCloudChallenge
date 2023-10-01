import { Component, OnInit } from '@angular/core';
import { JobStateActions, JobStore } from './store/job.store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JobAd, JobAdStatus } from '../../models/models';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';

@UntilDestroy()
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [JobStore],
})
export class JobComponent implements OnInit {
  jobAd$ = this._jobStore.jobAd$;

  currentJobAdId: number;

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
    private readonly _snackBarService: SnackBarService,
  ) {}

  ngOnInit() {
    this._loadJobAd();
    this._listenToStoreActions();
  }

  addSkill(event: MatChipInputEvent): void {
    const currentValues = this.jobAdForm.controls.skills.value;
    const newValue = (event.value || '').trim();

    if (currentValues.includes(newValue)) {
      this._displayMessage('You have already added this skill to this job ad');
      return;
    }

    if (newValue) {
      this.jobAdForm.controls.skills.patchValue([...currentValues, newValue]);
    }

    event.chipInput!.clear();
  }

  removeSkill(skillToBeRemoved: string) {
    const currentValues = this.jobAdForm.controls.skills.value;
    currentValues.splice(
      currentValues.findIndex((skill: string) => skill === skillToBeRemoved),
      1,
    );
    this.jobAdForm.controls.skills.patchValue([...currentValues]);
  }

  onSubmit() {
    const jobAd: Partial<JobAd> = {
      ...this.jobAdForm.getRawValue(),
      status: <JobAdStatus>this.jobAdForm.get('status').value,
    };

    if (this.currentJobAdId) {
      jobAd.id = this.currentJobAdId;
      this._jobStore.updateJobAd(jobAd);
    } else {
      this._jobStore.createJobAd(jobAd);
    }
  }

  private _loadJobAd(): void {
    this.currentJobAdId = this._route.snapshot.params['id'];
    if (this.currentJobAdId) {
      this._jobStore.getJobAd(this.currentJobAdId);
    }
  }

  private _listenToStoreActions(): void {
    this._jobStore.jobState$.pipe(untilDestroyed(this)).subscribe((state) => {
      switch (state.action) {
        case JobStateActions.JOB_LOADED:
          this._setupForm(state.jobAd);
          break;
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

  private _setupForm(jobAd: JobAd): void {
    this.jobAdForm.patchValue({ ...jobAd });
    if (jobAd.status === 'archived') {
      this.jobAdForm.disable();
    }
  }
}
