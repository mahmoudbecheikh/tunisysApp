import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Departement } from 'src/models/departement';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  departements: Departement[] = [];
  employe?: Employe;
  id?: any;
  prenomEmp?: String;
  nomEmp?: String;
  helper = new JwtHelperService();

  myForm: FormGroup = new FormGroup({});
  prenom: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  nom: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);

  departement: FormControl = new FormControl('', Validators.required);

  cin: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
      Validators.pattern('^[01][0-9]*$'),
    ],
    asyncValidators: [this.validatorCin()],
    updateOn: 'blur',
  });

  email: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: [this.validatorEmail()],
    updateOn: 'blur',
  });

  tel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);
  role: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private empService: EmployeeService,
    private depService: DepartementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res;
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    this.empService.afficherId(this.id).subscribe((emp) => {
      this.employe = emp;
      this.prenomEmp = emp.prenomEmp
      this.nomEmp = emp.nomEmp
      this.prenom.setValue(this.prenomEmp);
      this.departement.setValue(this.employe?.departement?._id)
      this.nom.setValue(this.nomEmp);
      this.cin.setValue(this.employe?.cin);
      this.email.setValue(this.employe?.email);
      this.role.setValue(this.employe?.role);
      this.tel.setValue(this.employe?.tel);
    });
    if (this.role.value == 0 || this.role.value==1) {
      this.departement.clearValidators();
      this.departement.updateValueAndValidity();
    }
  }

  createForm() {
    this.myForm = new FormGroup({
      prenom: this.prenom,
      nom: this.nom,
      departement: this.departement,
      cin: this.cin,
      email: this.email,
      tel: this.tel,
      role: this.role,
    });
  }

  modifier() {
    this.empService
      .modifier(this.employe?._id, this.myForm.value)
      .subscribe((res) => {
        this.toastr.success('', 'Employé modifié avec succès!');
        this.router.navigate(['admin/employees']);
      });
  }

  changeValue() {
    if (this.role.value == 0 || this.role.value==1) {
      this.departement.clearValidators();
    } else {
      this.departement.setValidators([Validators.required]);
    }
    this.departement.updateValueAndValidity();
  }

  validatorCin(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherCin(control.value).pipe(
        map((res) => {
          return res && this.employe?.cin != control.value
            ? { cinExist: true }
            : null;
        })
      );
    };
  }
  validatorEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherEmail(control.value).pipe(
        map((res) => {

          if (!res) return null;
          return res && this.employe?.email != control.value
            ? { emailExist: true }
            : null;
        })
      );
    };
  }
}
