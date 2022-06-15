import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

import { ActiviteRecenteComponent } from './activite-recente.component';

describe('ActiviteRecenteComponent', () => {
  let component: ActiviteRecenteComponent;
  let fixture: ComponentFixture<ActiviteRecenteComponent>;
  let fakeTickets: Ticket[] = [
    {
      _id: '1',
      ref: 100056,
      sujet: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet',
      manuel: 'assistant',
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers: [TicketService],
      declarations: [ ActiviteRecenteComponent ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteRecenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list tickets ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeTickets));
    component.afficherListe();
    expect(component.tickets.length).toEqual(1);
  });
});
