import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './admin/employee/update-employee/update-employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { ListTicketComponent } from './admin/tickets/list-ticket/list-ticket.component';
import { AddTicketComponent } from './admin/tickets/add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './admin/tickets/update-ticket/update-ticket.component';
import { AddDepartementComponent } from './admin/departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './admin/departement/list-departement/list-departement.component';
import { UpdateDepartementComponent } from './admin/departement/update-departement/update-departement.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';

import { DashbordStockComponent } from './gstock/dashbord-stock/dashbord-stock.component';
import { AddProductComponent } from './gstock/product/add-product/add-product.component';
import { ListProductComponent } from './gstock/product/list-product/list-product.component';
import { UpdateProductComponent } from './gstock/product/update-product/update-product.component';
import { AddCategoryComponent } from './gstock/category/add-category/add-category.component';
import { ListCategoryComponent } from './gstock/category/list-category/list-category.component';
import { UpdateCategoryComponent } from './gstock/category/update-category/update-category.component';
import { UpdateSubcategoryComponent } from './gstock/subcategory/update-subcategory/update-subcategory.component';
import { AddSubcategoryComponent } from './gstock/subcategory/add-subcategory/add-subcategory.component';
import { ListSubcategoryComponent } from './gstock/subcategory/list-subcategory/list-subcategory.component';


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    SidebarComponent,
    LoginComponent,
    ErrorComponent,
    HeaderComponent,
    ListTicketComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    AddDepartementComponent,
    ListDepartementComponent,
    UpdateDepartementComponent,
    DashbordComponent,
    DashbordStockComponent,
    AddProductComponent,
    ListProductComponent,
    UpdateProductComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    UpdateCategoryComponent,
    UpdateSubcategoryComponent,
    AddSubcategoryComponent,
    ListSubcategoryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
