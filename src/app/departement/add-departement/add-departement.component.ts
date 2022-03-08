import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css'],
})
export class AddDepartementComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)],
    asyncValidators: [this.validatorTitle()],
    updateOn: 'blur',
  });
  constructor(private depService: DepartementService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: this.title,
    });
  }

  returnToList() {
    this.router.navigate(['admin/departements']);
  }
  onSubmit() {
    this.depService.addDepartement(this.myForm.value).subscribe((res) => {
      this.router.navigate(['admin/departements']);
    });
  }

  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.depService.getByTitle(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res.length > 0 ? { titleExist: true } : null;
        })
      );
    };
  }
}
