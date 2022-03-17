import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/models/category';
import { Product } from 'src/models/product';
import { SubCategory } from 'src/models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class StockService {


  constructor(private http : HttpClient) { }

  readonly baseURL = 'http://localhost:3000/stocks';

  addCategory(category: Category) : Observable<any> {
    return this.http.post(this.baseURL+'/categories', category);
  }
  listCategory() {
    return this.http.get(this.baseURL+'/categories');
  }
  getCategoryById(id: any):Observable<Category> {
    return this.http.get(this.baseURL + `/categories/${id}`);
  }
  updateCategory(id : any,category: Category) {
    return this.http.put(this.baseURL + `/categories/${id}`, category);
  }
  deleteCategory(_id: string) {
    return this.http.delete(this.baseURL + `/categories/${_id}`);
  }
  getCategoryByTitle(title: string):Observable<any> {
    return this.http.get(this.baseURL + `/categories/cat/${title}`);
  }

// **************************************************************

  addSubCategory(subCategory: SubCategory) : Observable<any> {
    return this.http.post(this.baseURL+'/subcategories',subCategory);
  }

  listSubCategory() {
    return this.http.get(this.baseURL+'/subcategories');
  }
  getSubCategoryById(id: any):Observable<SubCategory> {
    return this.http.get(this.baseURL + `/subcategories/${id}`);
  }

  getSubCategoryByTitle(title: any):Observable<any> {
    return this.http.get(this.baseURL + `/subcategories/subc/${title}`);
  }

  updateSubCategory(id : any,SubCategory: SubCategory) {
    return this.http.put(this.baseURL + `/subcategories/${id}`, SubCategory);
  }

  deleteSubCategory(_id: string) {
    return this.http.delete(this.baseURL + `/subcategories/${_id}`);
  }

  // **************************************************************

  addProduct(product: Product) : Observable<any> {
    console.log(product)
    return this.http.post(this.baseURL+'/products', product);
  }
  listProduct() {
    return this.http.get(this.baseURL+'/products');
  }
  getProductById(id: any):Observable<Product> {
    return this.http.get(this.baseURL + `/products/${id}`);
  }

  getProductByTitle(title: any):Observable<any> {
    return this.http.get(this.baseURL + `/products/prod/${title}`);
  }

  getProductByRef(ref: any):Observable<any> {
    return this.http.get(this.baseURL + `/products/product/${ref}`);
  }
  updateProduct(id : any,Product: Product) {
    return this.http.put(this.baseURL + `/products/${id}`, Product);
  }

  deleteProduct(_id: string) {
    return this.http.delete(this.baseURL + `/products/${_id}`);
  }
}
