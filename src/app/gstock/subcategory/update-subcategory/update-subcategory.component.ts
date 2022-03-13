import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { Category } from 'src/models/category';
import { SubCategory } from 'src/models/subcategory';

@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css']
})
export class UpdateSubcategoryComponent implements OnInit {
  subcategory?: SubCategory;
  id?: number;
  myForm: FormGroup = new FormGroup({});
  categories: Category[] = [];

  title: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  category: FormControl = new FormControl('', [
    Validators.required
  ]);
  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getListDep();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.stockService.getSubCategoryById(this.id).subscribe((res) => {
      this.subcategory = res;
      this.title.setValue(this.subcategory.title);
      this.category.setValue(this.subcategory.category);
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      title: this.title,
      category : this.category
    });
  }

  getListDep() {

    this.stockService.listCategory().subscribe((res) => {
      this.categories = res as Category[];
    });
  }


  onSubmit() {
    this.stockService.updateSubCategory(this.subcategory?._id, this.myForm.value).subscribe((res) => {
        console.log(this.myForm.value)
        this.router.navigate(['stock/subcategories']);
      });
  }

  returnToList() {
    this.router.navigate(['stock/subcategories']);
  }
}
