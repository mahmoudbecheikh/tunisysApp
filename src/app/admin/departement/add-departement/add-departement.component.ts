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

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css'],
})
export class AddDepartementComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  nom: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatornom()],
    updateOn: 'blur',
  });
  constructor(
  private depService: DepartementService,
  private router: Router,
  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      nom: this.nom,
    });
  }
  ajouter() {
    this.depService.ajouter(this.myForm.value).subscribe((res) => {
      this.toastr.success('', 'Département ajouté avec succès!');
      console.log(res)
    });
  }

  validatornom(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.depService.afficherNom(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res ? { nomExist: true } : null;
        })
      );
    };
  }
}
