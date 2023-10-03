import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { delay, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api/api.service';

export class JobAdTitleValidator {
  static jobAdTitleValidator(apiService: ApiService, currentTitle: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (currentTitle === control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(500),
        switchMap((value) =>
          apiService
            .getJobTitleAlreadyExists(control.value)
            .pipe(map((result: boolean) => (result ? { repeatedTitle: true } : null))),
        ),
      );
    };
  }
}
