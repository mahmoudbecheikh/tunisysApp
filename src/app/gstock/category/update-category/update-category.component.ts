import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category ? : Category ; 
  myForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatorTitle()],
    updateOn: 'blur',
  });
  constructor(
    private stockService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: this.title,
    });
    let id = this.activatedRoute.snapshot.params['id'];
    this.stockService.getCategoryById(id).subscribe(res=>{
      this.category=res ;
      this.title.setValue(this.category?.title);
    })

  }

  onSubmit() {
    this.stockService.updateCategory(this.category?._id, this.myForm.value).subscribe((res) => {
      
      this.router.navigate(['stock/categories']);
      });
  }

  returnToList() {
    this.router.navigate(['stock/categories']);
  }

  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getCategoryByTitle(control.value).pipe(
        map((res) => {
          return res.length >= 1 && this.category?.title != control.value
            ? { cinExist: true }
            : null;
        })
      );
    };
  }

}
