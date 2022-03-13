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
import { StockService } from 'src/app/services/stock.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css'],
})
export class AddSubcategoryComponent implements OnInit {
  categories: Category[] = [];

  myForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatorTitle()],
    updateOn: 'blur',
  });
  category: FormControl = new FormControl('', [Validators.required]);

  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.getListCat();
  }

  createForm() {
    this.myForm = new FormGroup({
      title: this.title,
      category: this.category,
    });
  }

  getListCat() {
    this.stockService.listCategory().subscribe((res) => {
      this.categories = res as Category[];
    });
  }

  onSubmit() {
    this.stockService.addSubCategory(this.myForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['stock/subcategories']);
    });
  }

  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getSubCategoryByTitle(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res.length > 0 ? { titleExist: true } : null;
        })
      );
    };
  }
}
