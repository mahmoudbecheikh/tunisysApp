import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmpruntService } from 'src/app/services/emprunt.service';
import { StockService } from 'src/app/services/stock.service';
import { Category } from 'src/models/category';
import { Product } from 'src/models/product';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-emrpunts',
  templateUrl: './emrpunts.component.html',
  styleUrls: ['./emrpunts.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmrpuntsComponent implements OnInit {
  categories?: Category[];
  products: string[] = [];
  productFilter: any;

  myForm: FormGroup = new FormGroup({});
  employee: FormControl = new FormControl('', [Validators.required]);

  product: FormControl = new FormControl('', {
    validators: [Validators.required],
  });

  subCategory: FormControl = new FormControl('', [Validators.required]);

  returnDate: FormControl = new FormControl('', Validators.required);
  quantity: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.pattern('^[0-9]*')],
  });
  type: FormControl = new FormControl('', [Validators.required]);
  dateNow: any;
  constructor(
    private authService: AuthService,
    private stockService: StockService,
    private empService: EmpruntService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.authService.getAuth().subscribe((res) => {
      this.employee.setValue(res._id);
    });

    this.stockService.listCategory().subscribe((res) => {
      this.categories = res as Category[];
    });

    this.product.valueChanges.subscribe((response) => {
      console.log('data is ', response);
      this.filterData(response);
      this.stockService.getProductByTitle(response).subscribe((res) => {
        if (res) {
          if (this.quantity.value > res.quantity)
            this.quantity.setErrors({ qteError: true });
          else this.quantity.setErrors(null);
        } else {
          this.product.setErrors({ prodError: true });
          this.quantity.setErrors({ qteError: true });
        }
      });
    });
    this.quantity.valueChanges.subscribe((response) => {
      if (this.product.value != '') {
        this.stockService
          .getProductByTitle(this.product.value)
          .subscribe((res) => {
            if (res) {
              if (this.quantity.value > res.quantity)
                this.quantity.setErrors({ qteError: true });
            } else {
              this.product.setErrors({ prodError: true });
              this.quantity.setErrors({ qteError: true });
            }
          });
      }
    });

    this.type.valueChanges.subscribe((response) => {
      console.log(response);
      if (response == 'acquisition') {
        this.returnDate.setErrors(null);
      } else {
        this.returnDate.setErrors({ require: true });
      }
    });
    this.dateNow = new Date();
  }

  filterData(enteredData: any) {
    this.productFilter = this.products.filter((item) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      employee: this.employee,
      product: this.product,
      returnDate: this.returnDate,
      type: this.type,
      quantity: this.quantity,
      subCategory: this.subCategory,
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.empService.addEmprunt(this.myForm.value).subscribe((res) => {
      Object.keys(this.myForm.controls).forEach((key) => {
        let formC = this.myForm.get(key);
        if (formC) {
          formC.setValue('');
          formC.setErrors(null);
        }
      });
    });
  }

  onChange(id: string) {
    this.products = [];
    this.stockService.getSubCategoryById(id).subscribe((res) => {
      let array = res.products as Product[];
      if (array)
        for (var val of array) {
          let title = val.title;
          if (title) this.products.push(title);
        }
      this.productFilter = this.products;
    });
  }
}
