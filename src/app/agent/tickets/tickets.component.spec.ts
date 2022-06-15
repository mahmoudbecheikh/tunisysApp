import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SocketService } from 'src/app/services/socket.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Employe } from 'src/models/employe';
import { Ticket } from 'src/models/ticket';

import { TicketsComponent } from './tickets.component';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
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

  let fakeResolu : Ticket[] = [
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
    }
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        DragDropModule,
        ToastrModule.forRoot(),
        SocketIoModule.forRoot(config),
      ],
      providers: [EmployeeService, AuthService, SocketService, ToastrService],
      declarations: [TicketsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list tickets ', () => {
    const ticketService = fixture.debugElement.injector.get(TicketService);
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getAuth').and.returnValue(of(fakeEmployee));
    spyOn(ticketService, 'afficherEmploye').and.returnValue(of(fakeTickets));
    component.getListTicket();
    expect(component.tickets).toEqual(fakeTickets);
    expect(component.cours.length).toEqual(1);
    expect(component.resolu.length).toEqual(1);
    expect(component.faire.length).toEqual(0);
    expect(component.changement.length).toEqual(0);
  });



  // it('check ', () => {
  //   const service = fixture.debugElement.injector.get(TicketService);
  //   component.resolu = fakeResolu
  //   component.tickets = fakeTickets
  //   component.check()

  //   spyOn(service, 'changerStatut').and.returnValue(of(new Observable()));

  //   expect(service.changerStatut).toHaveBeenCalled();
  // });



  it('should quitter', () => {
    const service = fixture.debugElement.injector.get(TicketService);

    const spy = spyOn(service, 'quitter').and.returnValue(new Observable());
    const _idEmp = fakeEmployee._id;
    const idTicket = fakeTickets[0]._id;
    component.quitter(_idEmp, idTicket);
    expect(spy).toHaveBeenCalledWith(_idEmp, idTicket);
  });
});
