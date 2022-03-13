import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import { Product } from 'src/models/product';
import { SubCategory } from 'src/models/subcategory';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  subcategories: SubCategory[] = [];
  product? : Product ; 
  id? : number
  myForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    // Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  subCategory: FormControl = new FormControl('', [Validators.required]);
  ref: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    // Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  quantity: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*'),
  ]);
  constructor(
    private stockService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.stockService.getProductById(this.id).subscribe(res=>{
      this.product = res ;
      this.title.setValue(this.product.title)
      this.ref.setValue(this.product.ref)
      this.description.setValue(this.product.description)
      this.quantity.setValue(this.product.quantity)
    })
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
    this.stockService.updateProduct(this.product?._id, this.myForm.value).subscribe((res) => {
        console.log(this.myForm.value)
        this.router.navigate(['stock/products']);
      });
  }

  
  validatorTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getProductByTitle(control.value).pipe(
        map((res) => {
          return res.length >= 1 && this.product?.title != control.value
            ? { titleExist: true }
            : null;
        })
      );
    };
  }

  validatorRef(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.stockService.getProductByRef(control.value).pipe(
        map((res) => {
          return res.length >= 1 && this.product?.ref != control.value
            ? { refExist: true }
            : null;
        })
      );
    };
  }
}
