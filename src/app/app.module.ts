import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './admin/employee/update-employee/update-employee.component';
import { LoginComponent } from './securite/login/login.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { ListTicketComponent } from './admin/tickets/list-ticket/list-ticket.component';
import { AddTicketComponent } from './admin/tickets/add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './admin/tickets/update-ticket/update-ticket.component';
import { ListDepartementComponent } from './admin/list-departement/list-departement.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { TicketsComponent } from './agent/tickets/tickets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { InboxComponent } from './assistant/inbox/inbox.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TicketAttComponent } from './assistant/ticket/ticket-att/ticket-att.component';
import { ResetComponent } from './securite/reset/reset.component';
import { ForgetComponent } from './securite/forget/forget.component';
import { ChangeComponent } from './securite/change/change.component';
import { DetailTicketComponent } from './admin/tickets/detail-ticket/detail-ticket.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { SearchComponent } from './search/search.component';
import { PreviewPdfComponent } from './preview-pdf/preview-pdf.component';
import { ListReclamationComponent } from './admin/list-reclamation/list-reclamation.component';
import { DefaultComponent } from './default/default.component';
import { ChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component';
import { ToastrModule } from 'ngx-toastr';
import { ActiviteRecenteComponent } from './assistant/ticket/activite-recente/activite-recente.component';
import { RapportComponent } from './agent/rapport/rapport.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    LoginComponent,
    ErrorComponent,
    HeaderComponent,
    ListTicketComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    ListDepartementComponent,
    DashbordComponent,
    TicketsComponent,
    InboxComponent,
    TicketAttComponent,
    ResetComponent,
    ForgetComponent,
    ChangeComponent,
    DetailTicketComponent,
    SearchComponent,
    PreviewPdfComponent,
    ListReclamationComponent,
    DefaultComponent,
    ChatComponent,
    ActiviteRecenteComponent,
    RapportComponent,
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
    NgbModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ChartsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', timeOut: 1500 }),
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
