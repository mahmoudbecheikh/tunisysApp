import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Ticket } from 'src/models/ticket';

import { TicketAttComponent } from './ticket-att.component';

describe('TicketAttComponent', () => {
  let component: TicketAttComponent;
  let fixture: ComponentFixture<TicketAttComponent>;
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
      imports: [HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers : [TicketService , DepartementService],
      declarations: [ TicketAttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    spyOn(component, 'createForm').and.callThrough();
    spyOn(component, 'afficherListe').and.callThrough();
    spyOn(component, 'afficherDepartements').and.callThrough();

    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.afficherListe).toHaveBeenCalled();
    expect(component.afficherDepartements).toHaveBeenCalled();

  });

  it('list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.afficherDepartements();
    expect(component.departements).toEqual(fakeDepartements);
  });

 it('list tickets ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherAttente').and.returnValue(of(fakeTickets));
    component.afficherListe();
    expect(component.tickets).toEqual(fakeTickets);
  });

  it('submitting a form emits a ticket', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'ajouter').and.returnValue(of(fakeTicket));
    expect(component.myForm.valid).toBeFalsy();
    component.sujet.setValue('Lorem ipsum');
    component.description.setValue('Lorem ipsum dolor sit amet');
    component.departement.setValue('1');
    component.siteWeb.setValue('www.tunisys.tn');
    component.adresse.setValue('Aouina');
    component.telClient.setValue('20789456');
    component.emailClient.setValue('tunisys@gmail.com');
    component.nomClient.setValue('tunisys');
    component.dateLimite.setValue('2022-05-27T12:14:08.073+00:00');
    expect(component.myForm.valid).toBeTruthy();
    component.ajouter();
    expect(component.formdata.get('sujet')).toEqual(component.sujet.value);
    expect(spy).toHaveBeenCalledWith(component.formdata);
  });
});
