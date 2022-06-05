import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { SpinnerInterceptor } from 'src/app/interceptors/spinner.interceptor';
import { DepartementService } from 'src/app/services/departement.service';
import { MailService } from 'src/app/services/mail.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';

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

  it('list inbox ', () => {
    const service = fixture.debugElement.injector.get(MailService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeInbox));
    component.afficherListe();
    expect(component.mails).toEqual(fakeInbox);
  });

  it('list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);

    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.afficherDepartements();
    expect(component.departements).toEqual(fakeDepartements);
  });

  it('select mail', () => {
    component.select(fakeMail);
    expect(component.mailSelected).toEqual(fakeMail);
    expect(component.show).toEqual(false);
    expect(component.mailFiles).toEqual([]);
  });




});
