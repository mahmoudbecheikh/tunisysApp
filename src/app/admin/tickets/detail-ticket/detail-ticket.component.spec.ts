import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from 'src/app/search/search.component';
import { TicketService } from 'src/app/services/ticket.service';

import { DetailTicketComponent } from './detail-ticket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/models/ticket';
import { By } from '@angular/platform-browser';
import { Employe } from 'src/models/employe';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartementService } from 'src/app/services/departement.service';
import { Departement } from 'src/models/departement';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';
import { Reponse } from 'src/models/reponse';
import { NotificationService } from 'src/app/services/notification.service';
import { RapportComponent } from 'src/app/agent/rapport/rapport.component';

describe('DetailTicketComponent', () => {
  let component: DetailTicketComponent;
  let fixture: ComponentFixture<DetailTicketComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

  let fakeEmployee: Employe = {
    _id: '1',
    nomEmp: 'Ben salah',
    prenomEmp: 'Ali',
    departement: undefined,
    cin: 15011136,
    email: 'string',
    mdp: 'Azerty',
    adresse: 'string',
    role: 0,
    tel: 20789456,
  };
  let fakeTicket: Ticket = {
    _id: '1',
    ref: 100056,
    sujet: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet',
    manuel: 'admin',
    statut: 'en attente',
    emailClient: 'amen@gmail.com',
    nomClient: 'Amen',
    telClient: 20789456,
    rapport: undefined,
    departement: {
      _id: '1',
      nom: 'maintenance',
    },
    employe: undefined,
    feedBack: undefined,

    adresse: 'aouina',
    siteWeb: 'www.amen.tn',
    fJoint: [],
    tags: [],
    collaborateurs: [fakeEmployee],
    date: '2022-04-30T22:24:39.778+00:00',
    dateModif: '2022-04-30T22:24:39.778+00:00',
  };

  let ticketsFake: Ticket[] = [
    {
      _id: '1',
      ref: 100056,
      sujet: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet',
      manuel: 'admin',
      statut: 'en attente',
      emailClient: 'amen@gmail.com',
      nomClient: 'Amen',
      telClient: 20789456,
      rapport: undefined,
      departement: {
        _id: '1',
        nom: 'maintenance',
      },
      employe: undefined,
      feedBack: undefined,

      adresse: 'aouina',
      siteWeb: 'www.amen.tn',
      fJoint: [],
      tags: ['windows'],
      collaborateurs: [],
      date: '2022-04-30T22:24:39.778+00:00',
      dateModif: '2022-04-30T22:24:39.778+00:00',
    },
    {
      _id: '2',
      ref: 100057,
      sujet: 'Test',
      description: 'Lorem ipsum dolor sit amet',
      manuel: 'admin',
      statut: 'en attente',
      emailClient: 'amen@gmail.com',
      nomClient: 'Amen',
      telClient: 20789456,
      rapport: undefined,
      departement: {
        _id: '1',
        nom: 'maintenance',
      },
      employe: undefined,
      feedBack: undefined,

      adresse: 'aouina',
      siteWeb: 'www.amen.tn',
      fJoint: [],
      tags: ['installation'],
      collaborateurs: [],
      date: '2022-04-30T22:24:39.778+00:00',
      dateModif: '2022-04-30T22:24:39.778+00:00',
    },
  ];

  let fakeAllTags = ['windows', 'windows10', 'maintenance', 'installation'];

  let fakeDepartement: Departement = {
    _id: '1',
    nom: 'maintenance',
    employes: [fakeEmployee],
    tickets: [],
  };

  let fakeReponses: Reponse[] = [
    {
      _id: '1',
      titre: 'Lorem',
      text: 'Lorem ipsum dolor sit amet',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'admin/tickets/rapport/:id', component: RapportComponent },
          {
            path: 'assistant/tickets/rapport/:id',
            component: RapportComponent,
          },
          { path: 'agent/tickets/rapport/:id', component: RapportComponent },
        ]),
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatAutocompleteModule,
        SocketIoModule.forRoot(config),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [TicketService],
      declarations: [DetailTicketComponent, SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'afficherId').and.returnValue(of(fakeTicket));
    component.afficherTicket();
    fixture.detectChanges();

    expect(component.ticket).toEqual(fakeTicket);
    const refElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#reference')
    ).nativeElement;
    if (fakeTicket.ref)
      expect(refElement.innerText).toContain(String(fakeTicket.ref));
  });

  it('should list employe ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);
    spyOn(service, 'afficherId').and.returnValue(of(fakeDepartement));
    component.afficherEmploye();
    expect(component.employes).toEqual(fakeDepartement.employes);
  });

  it('should employe connecte', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'getAuth').and.returnValue(of(fakeEmployee));
    component.employeCnt();
    expect(component.employe).toEqual(fakeEmployee);
  });

  it('should list suggestion ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'suggestion').and.returnValue(of([fakeTicket]));
    component.afficherSuggestion();
    expect(component.suggestions).toEqual([fakeTicket]);
  });

  it('should list tags ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherListe').and.returnValue(of(ticketsFake));
    component.ticket = fakeTicket;
    component.afficherTags();
    expect(component.allTags).toEqual(['windows', 'installation']);
  });

  it('should list response ', () => {
    const service = fixture.debugElement.injector.get(MailService);
    spyOn(service, 'afficherReponses').and.returnValue(of(fakeReponses));
    component.reponses = fakeReponses;
    component.afficherReponse();
    expect(component.reponses).toEqual(fakeReponses);
  });

  it('should filterData', () => {
    component.allTags = fakeAllTags;
    component.filterData('windows');
    expect(component.filtredTags).toEqual(['windows', 'windows10']);
  });

  it('should remove tag', () => {
    component.tags = fakeAllTags;
    component.remove('maintenance');
    expect(component.tags.length).toEqual(fakeAllTags.length);
  });

  it('should selected tag', () => {
    component.tags = fakeAllTags;
    component.selected('xp');
    expect(component.filtredTags).toEqual([]);
    expect(component.tagsCtrl.value).toBeNull();
  });

  it('should filter data', () => {
    component.allTags = fakeAllTags;
    component.filterData('windows');
    expect(component.filtredTags).toEqual(['windows', 'windows10']);
  });

  it('should rapport redirecte', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.id = fakeTicket._id;
    component.employe = fakeEmployee;
    component.rapport();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset form', () => {
    component.resetForm();
    expect(component.sujet.value).toEqual('');
    expect(component.text.value).toEqual('');
  });

  it('should inserer reponse predefinie', () => {
    component.inserer('test');
    expect(component.text.value).toEqual('test');
  });

  it('should verifier collab', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'afficherId').and.returnValue(of(fakeTicket));
    component.afficherTicket();
    let responseTrue = component.verifyCollab('1');
    expect(responseTrue).toBeTruthy();
    let responseFalse = component.verifyCollab('0');
    expect(responseFalse).toBeFalsy();
  });

  it('should get notif', () => {
    const service = fixture.debugElement.injector.get(NotificationService);
    const spy = spyOn(service, 'afficherEnv').and.returnValue(of([]));
    component.employe = fakeEmployee;
    component.afficherNotifEnv();
    expect(spy).toHaveBeenCalled();
    // component.employe = undefined
    // component.afficherNotifEnv();
    // expect(spy).not.toHaveBeenCalled()
  });
});
