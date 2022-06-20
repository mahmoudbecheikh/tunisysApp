import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { SpinnerInterceptor } from 'src/app/interceptors/spinner.interceptor';
import { DepartementService } from 'src/app/services/departement.service';
import { MailService } from 'src/app/services/mail.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Ticket } from 'src/models/ticket';

import { InboxComponent } from './inbox.component';

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;
  let fakeMail: any = {
    uid: '1',
    body: 'test',
    date: '2022-04-30T22:33:37.850+00:00',
    from: 'becheikh.mahmoud.3@gmail.com',
    name: 'mahmoud becheikh',
    subject: 'test',
  };
  let fakeInbox: any[] = [
    {
      uid: '1',
      body: 'test',
      date: '2022-04-30T22:33:37.850+00:00',
      from: 'becheikh.mahmoud.3@gmail.com',
      name: 'mahmoud becheikh',
      subject: 'test',
    },
    {
      uid: '2',
      body: 'test',
      date: '2022-04-31T23:33:37.850+00:00',
      from: 'jendoubisahar25@gmail.com',
      name: 'sahar jendoubi',
      subject: 'test',
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
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        TicketService,
        DepartementService,
        MailService,
        SpinnerService,
      ],
      declarations: [InboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list inbox ', () => {
    const service = fixture.debugElement.injector.get(MailService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeInbox));
    component.afficherListe();
    expect(component.mails).toEqual(fakeInbox);
  });

  it('should list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);

    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.afficherDepartements();
    expect(component.departements).toEqual(fakeDepartements);
  });

  it('should select mail', () => {
    component.select(fakeMail);
    expect(component.mailSelected).toEqual(fakeMail);
    expect(component.show).toEqual(false);
    expect(component.mailFiles).toEqual([]);
  });


  it('should supprimer', () => {
    const service = fixture.debugElement.injector.get(MailService);
    const spy = spyOn(service, 'supprimer').and.returnValue(new Observable());
    component.mailSelected = {
      uid : '1'
    }
    const uid = '1';
    component.supprimer(uid,0);
    expect(spy).toHaveBeenCalled();
  });

  
  it('should supprimer w famech mail seledcte', () => {
    const service = fixture.debugElement.injector.get(MailService);
    const spy = spyOn(service, 'supprimer').and.returnValue(of({deleted:true}));
    const uid = '1';
    component.mailSelected = {uid:'1'}
    component.supprimer(uid,0);
    expect(spy).toHaveBeenCalled();
    fixture.detectChanges();

    expect(component.mailSelected).toBeNull()
  });

  it('should submitting a form emits a ticket', () => {
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
