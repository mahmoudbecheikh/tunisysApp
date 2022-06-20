import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListTicketComponent } from './list-ticket.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DepartementService } from 'src/app/services/departement.service';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ticket } from 'src/models/ticket';
import { Observable, of } from 'rxjs';
import { Departement } from 'src/models/departement';
import { By } from '@angular/platform-browser';

describe('ListTicketComponent', () => {
  let component: ListTicketComponent;
  let fixture: ComponentFixture<ListTicketComponent>;
  let fakeTickets: Ticket[] = [
    {
      _id: '1',
      ref: 100056,
      sujet: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet',
      manuel: 'admin',
      statut: 'en cours',
      emailClient: 'amen@gmail.com',
      nomClient: 'Amen',
      telClient: 20789456,
      rapport: {
        _id: '1',
        description: 'Lorem ipsum dolor sit amet',
        recapSujet: 'Lorem ipsum',
        fJoint: [],
      },
      departement: {
        _id: '1',
        nom: 'maintenance',
      },
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
      statut: 'resolu',
      emailClient: 'amen@gmail.com',
      nomClient: 'Amen',
      telClient: 20789456,
      rapport: {
        _id: '2',
        description: 'Lorem ipsum dolor sit amet',
        recapSujet: 'Lorem ipsum',
        fJoint: [],
      },
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
  let fakeDepartements: Departement[] = [
    {
      _id: '1',
      nom: 'infrastructure',
      employes: [],
      tickets: [],
    },
    {
      _id: '2',
      nom: 'maintenance',
      employes: [],
      tickets: [],
    },
  ];
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

    departement: {
      _id: '1',
      nom: 'maintenance',
    },
    adresse: 'aouina',
    siteWeb: 'www.amen.tn',
    fJoint: [],

    date: '2022-04-30T22:24:39.778+00:00',
    dateModif: '2022-04-30T22:24:39.778+00:00',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule ,RouterTestingModule , ReactiveFormsModule ,NgxPaginationModule,ToastrModule.forRoot() ],
      providers : [TicketService,DepartementService],
      declarations: [ ListTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit call', () => {
    spyOn(component, 'afficherList').and.callThrough();
    spyOn(component, 'listDepartement').and.callThrough();
    spyOn(component, 'trier').and.callThrough();
    spyOn(component, 'createForm').and.callThrough();

    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.listDepartement).toHaveBeenCalled();
    expect(component.trier).toHaveBeenCalled();
    expect(component.afficherList).toHaveBeenCalled();
  });


  it('should list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);

    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.listDepartement();
    expect(component.departementsArray).toEqual(fakeDepartements);
  });

  it('should list tickets ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeTickets));
    component.afficherList();
    expect(component.tickets).toEqual(fakeTickets);
  });

 
  it('should select ticket ', () => {
    component.selectTicket(fakeTicket);
    expect(component.ticketSelected).toEqual(fakeTicket);
  });
  


});
