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
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Departement } from 'src/models/departement';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  
  departements : Departement [] = []
  myForm: FormGroup = new FormGroup({});
  prenom: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  nom: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  departement : FormControl = new FormControl('',Validators.required)

  cin: FormControl = new FormControl('',{validators : [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern("^[01][0-9]*$"),
  ],asyncValidators :[this.validatorCin()], updateOn: 'blur'});

  
  email: FormControl = new FormControl('',{validators : [
    Validators.required,
    Validators.email
  ],asyncValidators :[this.validatorEmail()], updateOn: 'blur'});
  mdp: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  tel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern("^[234579][0-9]*$"),

  ]);
  role: FormControl = new FormControl('', [Validators.required]);


  constructor(private empService: EmployeeService,private depService : DepartementService ,private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.depService.afficherListe().subscribe(res=>{
      this.departements = res;
    })
  }

  createForm() {
    this.myForm = new FormGroup({
      prenom: this.nom,
      nom: this.prenom,
      departement : this.departement,
      cin: this.cin,
      email: this.email,
      mdp: this.mdp,
      tel: this.tel,
      role: this.role,
    });
  }
  
  ajouter() {
    this.empService.ajouter(this.myForm.value).subscribe((res) => {
      this.router.navigate(['admin/employees']);
    });
  }
  validatorCin(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherCin(control.value).pipe(
        map((res) => {
          if(!res) return null ;
          return res? {cinExist : true} : null;
        })
      );
    };
  }


  validatorEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherEmail(control.value).pipe(
        map((res) => {
          if(!res) return null ;
          return res ? {emailExist : true} : null;
        })
      );
    };
  }
}
