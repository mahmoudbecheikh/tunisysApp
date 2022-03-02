import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'admin',
    canActivate : [AdminGuardGuard],
    children: [
      {path : '' , component : AdminComponent},
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
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
