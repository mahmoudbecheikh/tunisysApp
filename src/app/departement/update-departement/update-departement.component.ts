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
  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)],
    asyncValidators: [this.validatorTitle()],
    updateOn: 'blur',
  });
  constructor(
    private depService: DepartementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: this.title,
    });
    let id = this.activatedRoute.snapshot.params['id'];
    this.depService.getById(id).subscribe(res=>{
      this.departement=res ;
      this.title.setValue(this.departement?.title);
    })

  }

  onSubmit() {
    this.depService.updateDepartement(this.departement?._id, this.myForm.value).subscribe((res) => {
      
        this.router.navigate(['admin/departements']);
      });
  }

  returnToList() {
    this.router.navigate(['admin/departements']);
  }

  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.depService.getByTitle(control.value).pipe(
        map((res) => {
          return res.length >= 1 && this.departement?.title != control.value
            ? { cinExist: true }
            : null;
        })
      );
    };
  }
}
