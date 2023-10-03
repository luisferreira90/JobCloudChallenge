import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../../../shared/services/snack-bar/snack-bar.service';
import { ApiService } from '../../../../shared/services/api/api.service';
import { JobAd } from '../../../../models/models';
import { JobAdTitleValidator } from '../../validators/same-name.validator';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-job-ad-form',
  templateUrl: './job-ad-form.component.html',
  styleUrls: ['./job-ad-form.component.scss'],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdFormComponent {
  @Output()
  createUpdateJobAd = new EventEmitter<JobAd>();

  jobAdForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _snackBarService: SnackBarService,
    private readonly _apiService: ApiService,
  ) {}

  private _jobAd: JobAd;

  get jobAd(): JobAd {
    return this._jobAd;
  }

  @Input() set jobAd(jobAd: JobAd) {
    this._jobAd = jobAd;
    this._setupForm(jobAd);
  }

  addSkill(event: MatChipInputEvent): void {
    const currentValues = this.jobAdForm.controls['skills'].value;
    const newValue = (event.value || '').trim();

    if (currentValues.includes(newValue)) {
      this._snackBarService.displayMessage('You have already added this skill to this job ad');
      return;
    }

    if (newValue) {
      this.jobAdForm.controls['skills'].patchValue([...currentValues, newValue]);
    }

    event.chipInput!.clear();
  }

  removeSkill(skillToBeRemoved: string) {
    const currentValues = this.jobAdForm.controls['skills'].value;
    currentValues.splice(
      currentValues.findIndex((skill: string) => skill === skillToBeRemoved),
      1,
    );
    this.jobAdForm.controls['skills'].patchValue([...currentValues]);
  }

  onSubmit() {
    this.createUpdateJobAd.emit(this.jobAdForm.getRawValue());
  }

  private _setupForm(jobAd: JobAd): void {
    this.jobAdForm = this._fb.group({
      id: [jobAd.id],
      title: [
        jobAd.title,
        Validators.required,
        [JobAdTitleValidator.createValidator(this._apiService)],
      ],
      description: [jobAd.description, Validators.required],
      skills: [[...jobAd.skills], Validators.required],
      status: jobAd.status,
    });

    if (jobAd.status === 'archived') {
      this.jobAdForm.disable();
    }
  }
}
