import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employe?: Employe;
  id? : any ;
  prenomEmp? : String ; 
  nomEmp? : String ; 
  helper = new JwtHelperService();
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
    Validators.minLength(4),
  ]);
  tel: FormControl = new FormControl('', [
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
    this.empService.afficherId(this.id).subscribe(emp=>{
      this.employe = emp ;
      this.prenomEmp  = emp.nomEmp?.split(" ")[0] ;
      this.nomEmp = emp.nomEmp?.split(" ")[1] ;
      this.prenom.setValue(this.prenomEmp)
      this.nom.setValue(this.nomEmp)
      this.cin.setValue(this.employe?.cin)
      this.email.setValue(this.employe?.email)
      this.role.setValue(this.employe?.role)
      this.adresse.setValue(this.employe?.adresse)
      this.tel.setValue(this.employe?.tel)

    });
  }

  createForm() {
    this.myForm = new FormGroup({
      prenom: this.prenom,
      nom: this.nom,
      cin: this.cin,
      email: this.email,
      mdp: this.mdp,
      adresse: this.adresse,
      tel: this.tel,
      role: this.role,
    });
  }



  modifier() {
    this.empService.modifier(this.employe?._id,this.myForm.value).subscribe((res) => {
      console.log(res) ;
      let token: any = localStorage.getItem('token');
      let decodeToken = this.helper.decodeToken(token);
      let id = decodeToken.id;
      if(id==res?._id && res.role!=0){
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }
      else
      this.router.navigate(['admin/employees']);
    });
  }

  validatorCin(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherCin(control.value).pipe(
        map((res) => {
          return (res && this.employe?.cin!=control.value) ? {cinExist : true} : null;
        })
      );
    };
  }
  validatorEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherCin(control.value).pipe(
        map((res) => {
          if(!res) return null ;
          return (res && this.employe?.email!=control.value) ? {emailExist : true} : null;
        })
      );
    };
  }
}
