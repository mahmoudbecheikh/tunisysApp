import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[] = [];

  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit(): void {
    this.getListCat();
  }

  getListCat() {
    this.stockService.listCategory().subscribe((res) => {
      this.categories = res as Category[];
    });
  }
  toAdd() {
    this.router.navigate(['stock/categories/add']);
  }

  goToUpdate(id: any) {
    const link = ['stock/categories/update/', id];
    this.router.navigate(link);
  }

  onDelete(id: any) {
    this.stockService.deleteCategory(id).subscribe((res) => {
      this.getListCat()
    });
  }
  

}
