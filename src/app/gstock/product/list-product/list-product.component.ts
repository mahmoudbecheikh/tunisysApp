import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.getListProd()

  }

  getListProd() {
    this.stockService.listProduct().subscribe((res) => {
      this.products = res as Product[];
    });
  }
  toAdd() {
    this.router.navigate(['stock/products/add']);
  }

  goToUpdate(id: any) {
    const link = ['stock/products/update', id];
    this.router.navigate(link);
  }

  onDelete(id: any) {
    this.stockService.deleteProduct(id).subscribe((res) => {
      this.getListProd()
    });
  }

}
