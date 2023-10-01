import { Component, OnInit } from '@angular/core';
import { JobStateActions, JobStore } from './store/job.store';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
    id: [''],
    title: ['', Validators.required],
    description: [''],
    skills: [],
    status: '',
  });

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly _jobStore: JobStore,
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this._loadJobAd();
    this._listenToStoreActions();
    this._setupForm();
  }

  private _loadJobAd(): void {
    const jobAdId = this._route.snapshot.params['id'];
    if (jobAdId) {
      this._jobStore.getJobAd(jobAdId);
    }
  }

  private _listenToStoreActions(): void {
    this._jobStore.jobAction$.pipe(untilDestroyed(this)).subscribe((action) => {
      switch (action) {
        case JobStateActions.JOB_LOADED:
          this._setupForm();
          null;
          break;
        case JobStateActions.JOB_CREATED:
          null;
          break;
        case JobStateActions.JOB_UPDATED:
          null;
          break;
      }
    });
  }

  private _setupForm(): void {}

  updateJobAd() {
    this.jobAdForm.patchValue({
      title: 'Test',
      description: '',
    });
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

  onSubmit() {}
}
