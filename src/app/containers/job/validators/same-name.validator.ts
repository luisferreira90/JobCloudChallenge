import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api/api.service';

export class JobAdTitleValidator {
  static checkIfNameAlreadyExistsValidator(
    apiService: ApiService,
    currentTitle: string,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (currentTitle === control.value) {
        return of(null);
      }
      return apiService
        .getJobTitleAlreadyExists(control.value)
        .pipe(map((result: boolean) => (result ? { repeatedTitle: true } : null)));
    };
  }
}
