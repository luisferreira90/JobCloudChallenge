import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api/api.service';

export class JobAdTitleValidator {
  static createValidator(apiService: ApiService, currentTitle = ''): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return apiService
        .getJobTitleAlreadyExists(control.value)
        .pipe(map((result: boolean) => (result ? { repeatedTitle: true } : null)));
    };
  }
}
