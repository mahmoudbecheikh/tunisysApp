import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import { SubCategory } from 'src/models/subcategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  subcategories: SubCategory[] = [];

  myForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.validatorTitle()],
    updateOn: 'blur',
  });
  subCategory: FormControl = new FormControl('', [Validators.required]);
  ref: FormControl = new FormControl('',{validators: [
    Validators.required,
    Validators.minLength(4),
    // Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ] , asyncValidators : [this.validatorRef()]});
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  quantity: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*'),
  ]);
  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.getListSubc();
  }

  createForm() {
    this.myForm = new FormGroup({
      title: this.title,
      subCategory: this.subCategory,
      ref: this.ref,
      description: this.description,
      quantity: this.quantity,
    });
  }

  getListSubc() {
    this.stockService.listSubCategory().subscribe((res) => {
      this.subcategories = res as SubCategory[];
    });
  }

  returnToList() {
    this.router.navigate(['stock/products']);
  }
  onSubmit() {
    this.stockService.addProduct(this.myForm.value).subscribe((res) => {
      this.router.navigate(['stock/products']);
    });
  }

  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getProductByTitle(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res.length > 0 ? { titleExist: true } : null;
        })
      );
    };
  }

  validatorRef(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getProductByRef(control.value).pipe(
        map((res) => {
          if (!res) return null;
          return res.length > 0 ? { RefExist: true } : null;
        })
      );
    };
  }

}
