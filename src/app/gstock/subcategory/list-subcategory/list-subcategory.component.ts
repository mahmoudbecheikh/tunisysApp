import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { SubCategory } from 'src/models/subcategory';

@Component({
  selector: 'app-list-subcategory',
  templateUrl: './list-subcategory.component.html',
  styleUrls: ['./list-subcategory.component.css']
})
export class ListSubcategoryComponent implements OnInit {

  subcategories: SubCategory[] = [];

  constructor(private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.getListSub()

  }

  getListSub() {
    this.stockService.listSubCategory().subscribe((res) => {
      console.log('ena'+ res)
      this.subcategories = res as SubCategory[];
    });
  }
  toAdd() {
    this.router.navigate(['stock/subcategories/add']);
  }

  goToUpdate(id: any) {
    const link = ['stock/subcategories/update', id];
    this.router.navigate(link);
  }

  onDelete(id: any) {
    this.stockService.deleteSubCategory(id).subscribe((res) => {
      this.getListSub()
    });
  }
}
