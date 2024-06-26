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
import { ToastrService } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Departement } from 'src/models/departement';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  departements: Departement[] = [];
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
  mdp: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
  ]);
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
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.afficherListe();
  }

  createForm() {
    this.myForm = new FormGroup({
      prenom: this.prenom,
      nom: this.nom,
      departement: this.departement,
      cin: this.cin,
      email: this.email,
      mdp: this.mdp,
      tel: this.tel,
      role: this.role,
    });
  }

  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  ajouter() {
    if (this.role.value == 0 || this.role.value == 1) {
      this.departement.setValue(null);
    }
    this.empService.ajouter(this.myForm.value).subscribe((res) => {
      if (res) {
        this.toastr.success('', 'Employé ajouté avec succès!');
        this.router.navigate(['admin/employees']);
      }
    });
  }

  changeValue() {
    if (this.role.value == 0 || this.role.value == 1) {
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
          if (!res) return null;
          return res ? { cinExist: true } : null;
        })
      );
    };
  }

  validatorEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.empService.afficherEmail(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res ? { emailExist: true } : null;
        })
      );
    };
  }
}
