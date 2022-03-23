import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DepartementService } from 'src/app/services/departement.service';
import { Departement } from 'src/models/departement';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.css'],
})
export class UpdateDepartementComponent implements OnInit {
  departement? : Departement ; 
  myForm: FormGroup = new FormGroup({});
  nom: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatornom()],
    updateOn: 'blur',
  });
  constructor(
    private depService: DepartementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      nom: this.nom,
    });
    let id = this.activatedRoute.snapshot.params['id'];
    this.depService.afficherId(id).subscribe(res=>{
      this.departement=res ;
      this.nom.setValue(this.departement?.nom);
    })

  }

  modifier() {
    this.depService.modifier(this.departement?._id, this.myForm.value).subscribe((res) => {
      
        this.router.navigate(['admin/departements']);
      });
  }


  validatornom(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.depService.afficherNom(control.value).pipe(
        map((res) => {
          return res && this.departement?.nom != control.value
            ? { cinExist: true }
            : null;
        })
      );
    };
  }
}
