import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { ErrorComponent } from './error/error.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { AddTicketComponent } from './tickets/add-ticket/add-ticket.component';
import { ListTicketComponent } from './tickets/list-ticket/list-ticket.component';
import { UpdateTicketComponent } from './tickets/update-ticket/update-ticket.component';

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
      { path: '', component: AdminComponent },
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
