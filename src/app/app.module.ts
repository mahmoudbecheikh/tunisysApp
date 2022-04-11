import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './admin/employee/update-employee/update-employee.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './securite/login/login.component';
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
import { InboxComponent } from './assistant/inbox/inbox.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TicketAttComponent } from './assistant/ticket/ticket-att/ticket-att.component';
import { DetailTicketAttComponent } from './assistant/ticket/detail-ticket-att/detail-ticket-att.component';
import { ResetComponent } from './securite/reset/reset.component';
import { ForgetComponent } from './securite/forget/forget.component';
import { ChangeComponent } from './securite/change/change.component';
import { DetailTicketComponent } from './admin/tickets/detail-ticket/detail-ticket.component';

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
    InboxComponent,
    TicketAttComponent,
    DetailTicketAttComponent,
    ResetComponent,
    ForgetComponent,
    ChangeComponent,
    DetailTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
