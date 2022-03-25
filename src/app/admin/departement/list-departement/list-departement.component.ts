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
import { Departement } from 'src/models/departement';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css'],
})
export class ListDepartementComponent implements OnInit {
  departements: Departement[] = [];
  departement?: Departement;
  myForm: FormGroup = new FormGroup({});
  nom: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatornom()],
    updateOn: 'blur',
  });
  constructor(private depService: DepartementService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      nom: this.nom,
    });
    this.getListDep();
  }

  getListDep() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  ajouter() {
    this.depService.ajouter(this.myForm.value).subscribe((res) => {
      this.getListDep();
      this.nom.setValue('');
      console.log(res);
    });
  }

  modifier() {
    this.depService
      .modifier(this.departement?._id, this.myForm.value)
      .subscribe((res) => {
        this.getListDep();
        this.myForm.reset();
      });
  }

  supprimer(id: any) {
    this.depService.supprimer(id).subscribe((res) => {
      this.getListDep();
    });
  }

  selectDepartement(id: any) {
    this.depService.afficherId(id).subscribe((res) => {
      this.nom.setValue(res.nom);
      this.departement = res;
    });
  }

  reset() {
    this.departement = undefined;
    this.myForm.reset();
  }

  validatornom(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.depService.afficherNom(control.value).pipe(
        map((res) => {
          if (!res) return null;

          if (this.departement) {
            return res && this.departement.nom != control.value
              ? { nomExist: true }
              : null;
          }

          return res ? { nomExist: true } : null;
        })
      );
    };
  }
}
