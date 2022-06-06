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

describe('DetailTicketComponent', () => {
  let component: DetailTicketComponent;
  let fixture: ComponentFixture<DetailTicketComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    collaborateurs: [],
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

  let fakeDepartement: Departement = {
    _id: '1',
    nom: 'maintenance',
    employes: [fakeEmployee],
    tickets: [],
  };

  let fakeReponses  : Reponse []= [
    {
      _id : '1',
      titre : 'Lorem' ,
      text : 'Lorem ipsum dolor sit amet'
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
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



  it('select', () => {
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

  it('list employe ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);
    spyOn(service, 'afficherId').and.returnValue(of(fakeDepartement));
    component.afficherEmploye();
    expect(component.employes).toEqual(fakeDepartement.employes);
  });

  it('employe connecte', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'getAuth').and.returnValue(of(fakeEmployee));
    component.employeCnt();
    expect(component.employe).toEqual(fakeEmployee);
  });

  it('list suggestion ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'suggestion').and.returnValue(of(fakeTicket));
    component.afficherSuggestion();
    expect(component.suggestions).toEqual(fakeTicket);
  });

  it('list tags ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherListe').and.returnValue(of(ticketsFake));
    component.ticket = fakeTicket;
    console.log(component.ticket);
    component.afficherTags();
    expect(component.allTags).toEqual(['windows', 'installation']);
  });

  it('list response ', () => {
    const service = fixture.debugElement.injector.get(MailService);
    spyOn(service, 'afficherReponses').and.returnValue(of(fakeReponses));
    component.reponses = fakeReponses;
    component.afficherReponse();
    expect(component.reponses).toEqual(fakeReponses);
  });


  // it('shyh', () => {
  //   const router = TestBed.get(Router);
  //   const spy = spyOn(router, 'navigate');

  //   // const service = fixture.debugElement.injector.get(TicketService);
  //   // spyOn(service, 'confirmer').and.returnValue(of(true));
  //   component.confirmer();
  //   expect(spy).toHaveBeenCalledWith(['assistant/tickets']);

  // });

  it('filterData', () => {
    component.allTags = fakeAllTags;
    component.filterData('windows');
    expect(component.filtredTags).toEqual(['windows', 'windows10']);
  });

  it('remove tag', () => {
    component.tags = fakeAllTags;
    component.remove('maintenance');
    expect(component.tags.length).toEqual(fakeAllTags.length);
  });


  it('selected tag', () => {
    component.tags = fakeAllTags;
    component.selected('xp');
    expect(component.filtredTags).toEqual([])
    expect(component.tagsCtrl.value).toBeNull()

  });

  

  it('envoyerMail', () => {
    component.allTags = fakeAllTags;
    component.filterData('windows');
    expect(component.filtredTags).toEqual(['windows', 'windows10']);
  });

  it('rapport redirecte', () => {
    component.rapport();
    component.id = fakeTicket._id;
    component.employe = fakeEmployee;
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
  });

  it('reset form', () => {
    component.resetForm();
    expect(component.sujet.value).toEqual('');
    expect(component.text.value).toEqual('');
  });

  it('inserer reponse predefinie', () => {
    component.inserer('test');
    expect(component.text.value).toEqual('test');
    const textElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#desc')
    ).nativeElement;
    expect(textElement.value).toContain('test');
  });

 

});
