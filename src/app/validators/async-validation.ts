import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

export class CustomValidator {
  constructor(private empService: EmployeeService) {}

validatorCin(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherCin(control.value).pipe(
        map((res) => {
          if (!res) return null;
          console.log(res);
          return res.cin == control.value ? { cinExist: true } : null;
        })
      );
    };
  }
}
