import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { ListTicketComponent } from './tickets/list-ticket/list-ticket.component';
import { AddTicketComponent } from './tickets/add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './tickets/update-ticket/update-ticket.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { UpdateDepartementComponent } from './departement/update-departement/update-departement.component';


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    SidebarComponent,
    LoginComponent,
    AdminComponent,
    ErrorComponent,
    HeaderComponent,
    ListTicketComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    AddDepartementComponent,
    ListDepartementComponent,
    UpdateDepartementComponent

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
