import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AddDepartementComponent } from './admin/departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './admin/departement/list-departement/list-departement.component';
import { UpdateDepartementComponent } from './admin/departement/update-departement/update-departement.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './admin/employee/update-employee/update-employee.component';
import { AddTicketComponent } from './admin/tickets/add-ticket/add-ticket.component';
import { ListTicketComponent } from './admin/tickets/list-ticket/list-ticket.component';
import { UpdateTicketComponent } from './admin/tickets/update-ticket/update-ticket.component';
import { ErrorComponent } from './error/error.component';
import { AddCategoryComponent } from './gstock/category/add-category/add-category.component';
import { ListCategoryComponent } from './gstock/category/list-category/list-category.component';
import { UpdateCategoryComponent } from './gstock/category/update-category/update-category.component';
import { DashbordStockComponent } from './gstock/dashbord-stock/dashbord-stock.component';
import { AddProductComponent } from './gstock/product/add-product/add-product.component';
import { ListProductComponent } from './gstock/product/list-product/list-product.component';
import { UpdateProductComponent } from './gstock/product/update-product/update-product.component';
import { AddSubcategoryComponent } from './gstock/subcategory/add-subcategory/add-subcategory.component';
import { ListSubcategoryComponent } from './gstock/subcategory/list-subcategory/list-subcategory.component';
import { UpdateSubcategoryComponent } from './gstock/subcategory/update-subcategory/update-subcategory.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { StockGuard } from './guards/stock.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: '',component:DashbordComponent },
      {
        path: 'employees',
        children: [
          {
            path: '',
            component: ListEmployeeComponent,
          },
          {
            path: 'add',
            component: AddEmployeeComponent,
          },
          {
            path: 'update/:id',
            component: UpdateEmployeeComponent,
          },
        ],
      },
      {
        path: 'departements',
        children: [
          {
            path: '',
            component: ListDepartementComponent,
          },
          {
            path: 'add',
            component: AddDepartementComponent,
          },
          {
            path: 'update/:id',
            component: UpdateDepartementComponent,
          },
        ],
      },
      {
        path: 'tickets',
        children: [
          {
            path: '',
            component: ListTicketComponent,
          },
          {
            path: 'add',
            component: AddTicketComponent,
          },
          {
            path: 'update/:id',
            component: UpdateTicketComponent,
          },
        ],
      },
    ],
  },



  {
    path: 'stock',
    canActivate: [StockGuard],
    children: [
      { path: '',component:DashbordStockComponent },
      {
        path: 'categories',
        children: [
          {
            path: '',
            component : ListCategoryComponent
          },
          {
            path: 'add',
            component: AddCategoryComponent,
          },
          {
            path: 'update/:id',
            component: UpdateCategoryComponent,
          },
        ],
      },
      {
        path: 'subcategories',
        children: [
          {
            path: '',
            component:ListSubcategoryComponent ,
          },
          {
            path: 'add',
            component: AddSubcategoryComponent,
          },
          {
            path: 'update/:id',
            component: UpdateSubcategoryComponent,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ListProductComponent,
          },
          {
            path: 'add',
            component: AddProductComponent,
          },
          {
            path: 'update/:id',
            component: UpdateProductComponent,
          },
        ],
      },
    ],
  },


  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
