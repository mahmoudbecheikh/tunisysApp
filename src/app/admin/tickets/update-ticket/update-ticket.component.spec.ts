import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Employe } from 'src/models/employe';
import { Ticket } from 'src/models/ticket';

import { UpdateTicketComponent } from './update-ticket.component';

describe('UpdateTicketComponent', () => {
  let component: UpdateTicketComponent;
  let fixture: ComponentFixture<UpdateTicketComponent>;
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
      providers: [
        EmployeeService,
        TicketService,
        DepartementService,
        AuthService,
        ToastrService,
      ],
      declarations: [UpdateTicketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTicketComponent);
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


  it('afficher ticket', () => {
 
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherId').and.returnValue(of(fakeTicket));
    component.afficherTicket()
    expect(component.ticket).toEqual(fakeTicket);
    fixture.detectChanges();
    const sujetElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#sujet')
    ).nativeElement;
    expect(sujetElement.value).toContain('Lorem ipsum')
    console.log(sujetElement)
  });

  it('list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);

    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.afficherListe();
    expect(component.departements).toEqual(fakeDepartements);
  });

  it('submitting a form emits a ticket', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'modifier').and.returnValue(of(fakeTicket));
    component.ticket = fakeTicket
    component.employeCnt = fakeEmployee
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
    component.modifier();
    // expect(component.formdata.get('sujet')).toEqual(component.sujet.value);
    expect(spy).toHaveBeenCalledWith(component.ticket._id,component.formdata);
  });
});
