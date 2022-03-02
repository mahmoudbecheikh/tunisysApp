import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee?: Employee;
  id? : any ;
  firstName? : String ; 
  lastName? : String ; 
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
    Validators.minLength(4),
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
    Validators.minLength(6),
  ]);
  constructor(
    private empService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.id = this.activatedRoute.snapshot.params['id'];
    this.empService.getById(this.id).subscribe(emp=>{
      this.employee = emp ;
      this.firstName  = emp.fullName?.split(" ")[0] ;
      this.lastName  = emp.fullName?.split(" ")[1] ;
      this.first.setValue(this.firstName)
      this.last.setValue(this.lastName)
      this.cin.setValue(this.employee?.cin)
      this.email.setValue(this.employee?.email)
      this.role.setValue(this.employee?.role)
      this.adresse.setValue(this.employee?.adresse)
      this.phone.setValue(this.employee?.phone)

    });
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



  onSubmit() {
    this.empService.updateEmployee(this.employee?._id,this.myForm.value).subscribe((res) => {
      this.router.navigate(['admin/employees']);
    });
    console.log(this.myForm.controls)
    console.log(this.myForm.valid)


  }


  returnToList() {
    this.router.navigate(['admin/employees']);
  }
  validatorCin(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.getByCin(control.value).pipe(
        map((res) => {
          return (res.length>=1 && this.employee?.cin!=control.value) ? {cinExist : true} : null;
        })
      );
    };
  }


  validatorEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.getByEmail(control.value).pipe(
        map((res) => {
          if(!res) return null ;
          return (res.length>=1 && this.employee?.email!=control.value) ? {emailExist : true} : null;
        })
      );
    };
  }
}
