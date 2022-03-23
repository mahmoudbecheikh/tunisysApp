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
import { TicketsComponent } from './agent/tickets/tickets/tickets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { DetailTicketComponent } from './agent/tickets/detail-ticket/detail-ticket.component';
import { InboxMailComponent } from './agent/mails/inbox-mail/inbox-mail.component';


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
    TicketsComponent,
    DetailTicketComponent,
    InboxMailComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
