import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AddDepartementComponent } from './admin/departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './admin/departement/list-departement/list-departement.component';
import { UpdateDepartementComponent } from './admin/departement/update-departement/update-departement.component';
import { AddEmployeeComponent } from './admin/employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './admin/employee/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './admin/employee/update-employee/update-employee.component';
import { ListReclamationComponent } from './admin/reclamation/list-reclamation/list-reclamation.component';
import { AddTicketComponent } from './admin/tickets/add-ticket/add-ticket.component';
import { DetailTicketComponent } from './admin/tickets/detail-ticket/detail-ticket.component';
import { ListTicketComponent } from './admin/tickets/list-ticket/list-ticket.component';
import { UpdateTicketComponent } from './admin/tickets/update-ticket/update-ticket.component';
import { TicketsComponent } from './agent/tickets/tickets/tickets.component';
import { InboxComponent } from './assistant/inbox/inbox.component';
import { AddRapportComponent } from './assistant/ticket/add-rapport/add-rapport.component';
import { DetailTicketAttComponent } from './assistant/ticket/detail-ticket-att/detail-ticket-att.component';
import { TicketAttComponent } from './assistant/ticket/ticket-att/ticket-att.component';
import { ErrorComponent } from './error/error.component';
import { AdminGuard } from './guards/admin.guard';
import { AgentGuard } from './guards/agent.guard';
import { AssistantGuard } from './guards/assistant.guard';
import { AuthGuard } from './guards/auth.guard';
import { PreviewPdfComponent } from './preview-pdf/preview-pdf.component';
import { ChangeComponent } from './securite/change/change.component';
import { ForgetComponent } from './securite/forget/forget.component';
import { LoginComponent } from './securite/login/login.component';
import { ResetComponent } from './securite/reset/reset.component';

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
      { path: '', component: DashbordComponent },
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
            path: ':id',
            component: DetailTicketAttComponent,
          },
          {
            path: 'update/:id',
            component: UpdateTicketComponent,
          },
        ],
      },

      {
        path: 'reclamation',
        component :ListReclamationComponent
      },

    ],
  },

  {
    path: 'agent',
    canActivate: [AgentGuard],
    children: [
      { path: '', component: TicketsComponent },
      {
        path: 'tickets',
        children: [
          {
            path: '',
            component: TicketsComponent,
          },
          {
            path: ':id',
            component: DetailTicketAttComponent,
          },
          {
            path: 'rapport/:id',
            component: AddRapportComponent,
          }
        ],
      },
    ],
  },

  {
    path: 'assistant',
    canActivate: [AssistantGuard],
    children: [
      { path: '', component: TicketAttComponent },
      {
        path: 'tickets',
        children: [
          {
            path: '',
            component: TicketAttComponent,
          },
          {
            path: ':id',
            component: DetailTicketAttComponent,
          }
        ],
      },
      {
        path: 'inbox',
        component: InboxComponent,
      },
    ],
  },

  {
    path: 'pdf/:id',
    component: PreviewPdfComponent
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'oublie',
    component: ForgetComponent,
  },
  {
    path: 'reinitialise/:token/:tokenExpire',
    component: ResetComponent,
  },
  {
    path: 'change',
    component: ChangeComponent,
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
