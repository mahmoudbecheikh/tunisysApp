import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomValidator } from 'src/app/validators/async-validation';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  first: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  last: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  cin: FormControl = new FormControl('',{validators : [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern("^[01][0-9]*$"),
  ],asyncValidators :[this.validatorCin()], updateOn: 'blur'});

  
  email: FormControl = new FormControl('',{validators : [
    Validators.required,
    Validators.email,
    Validators.pattern(".*com$")
  ],asyncValidators :[this.validatorEmail()], updateOn: 'blur'});
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  phone: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern("^[234579][0-9]*$"),

  ]);
  role: FormControl = new FormControl('', [Validators.required]);
  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.myForm = new FormGroup({
      first: this.first,
      last: this.last,
      cin: this.cin,
      email: this.email,
      password: this.password,
      adresse: this.adresse,
      phone: this.phone,
      role: this.role,
    });
  }
  returnToList() {
    this.router.navigate(['admin/employees']);
  }
  onSubmit() {
    this.empService.addEmployee(this.myForm.value).subscribe((res) => {
      this.router.navigate(['admin/employees']);
    });
  }
  validatorCin(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.getByCin(control.value).pipe(
        map((res) => {
          if(!res) return null ;
          return res.length>0 ? {cinExist : true} : null;
        })
      );
    };
  }


  validatorEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.getByEmail(control.value).pipe(
        map((res) => {
          if(!res) return null ;
          return res.length>0 ? {emailExist : true} : null;
        })
      );
    };
  }
}
