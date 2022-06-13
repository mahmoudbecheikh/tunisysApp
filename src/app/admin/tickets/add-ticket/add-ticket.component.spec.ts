import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddTicketComponent } from './add-ticket.component';
import { Departement } from 'src/models/departement';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/models/ticket';
import { Router } from '@angular/router';

describe('AddTicketComponent', () => {
  let component: AddTicketComponent;
  let fixture: ComponentFixture<AddTicketComponent>;
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
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        ToastrModule.forRoot(),
      ],
      providers: [TicketService, DepartementService],
      declarations: [AddTicketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    spyOn(component, 'createForm').and.callThrough();
    spyOn(component, 'afficherListe').and.callThrough();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.afficherListe).toHaveBeenCalled();
  });

  it('list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.afficherListe();
    expect(component.departements).toEqual(fakeDepartements);
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

  it('select date', () => {

    component.onSelect('2022-05-27T12:14:08.073+00:00')
    expect(component.dateLimite.value).toEqual('2022-05-27T12:14:08.073+00:00')
  });


  it('seturn to list', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.returnToList()
    expect(spy).toHaveBeenCalledWith(['admin/tickets']);
  });
});
