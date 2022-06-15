import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ticket } from 'src/models/ticket';

import { TicketService } from './ticket.service';

let fakeTickets: Ticket[] = [
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

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
