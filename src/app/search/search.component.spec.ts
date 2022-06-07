import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { TicketService } from '../services/ticket.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchComponent } from './search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Ticket } from 'src/models/ticket';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
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
      ref: 100058,
      sujet: 'Lorem ipsumt',
      description: 'Lorem ipsum',
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
      adresse: 'aouina',
      siteWeb: 'www.amen.tn',
      fJoint: [],
      tags: ['installation'],
      collaborateurs: [],
      date: '2022-04-30T22:24:39.778+00:00',
      dateModif: '2022-04-30T22:24:39.778+00:00',
    },
    {
      _id: '3',
      ref: 100059,
      sujet: 'Test',
      description: 'Test',
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

      imports: [HttpClientTestingModule,ToastrModule.forRoot() ,ReactiveFormsModule ,MatAutocompleteModule , MatFormFieldModule , MatInputModule ,BrowserAnimationsModule ],
      providers: [TicketService],
      declarations: [ SearchComponent ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('list tickets ', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeTickets));
    component.afficherListe();
    expect(component.tickets).toEqual(fakeTickets);
  });

  it('filter data ', () => {
    component.tickets = fakeTickets 
    component.filterData('Lorem')
    expect(component.filterData.length).toEqual(1)
  });

  

});
