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
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private depService: DepartementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      nom: this.nom,
    });
    this.getListDep();
  }

  getListDep() {
    this.depService.afficherListe().subscribe((res) => {
      if(Array.isArray(res))
      this.departements = res ;
      else this.departements = []
    });
  }

  ajouter() {
    this.depService.ajouter(this.myForm.value).subscribe((res) => {
      if(res){
        this.getListDep();
        this.toastr.success('', 'Département ajouté avec succès!');
        this.myForm.reset();
      }


    });
  }

  modifier() {
    this.depService.modifier(this.departement?._id, this.myForm.value).subscribe((res) => {
        if(res){
          this.toastr.success('', 'Département modifié avec succès!');
          this.getListDep();
        }
        
      });
  }

  supprimer(id: any) {
    this.depService.supprimer(id).subscribe((res) => {
      if(res){
        this.toastr.success('', 'Département supprimé avec succès!');
        this.getListDep();
      }
    });
  }

  selectDepartement(departement: Departement) {
    if(departement){
      this.nom.setValue(departement.nom);
      this.departement = departement;
    }
 
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
