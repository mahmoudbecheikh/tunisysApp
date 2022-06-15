import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';
import { SocketService } from '../services/socket.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HeaderComponent } from './header.component';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Notification } from 'src/models/notification';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Employe } from 'src/models/employe';
import { Message } from 'src/models/message';
import { Conversation } from 'src/models/conversation';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

  let fakeNotifs: Notification[] = [
    {
      _id: '1234',
      envoyeur: {
        prenomEmp: 'ines',
        _id: '1',
      },
      recepteur: {
        prenomEmp: 'mahmoud',
        _id: '0',
      },
      contenu: 'reclamation',
      ticket: {
        _id: '1',
        ref: 100325,
      },
      lue: false,
      date: '2022-06-02T18:43:48.988+00:00',
    },
    {
      _id: '1234',
      envoyeur: {
        prenomEmp: 'ines',
        _id: '1',
      },
      recepteur: {
        prenomEmp: 'sahar',
        _id: '25',
      },
      contenu: 'reclamation',
      ticket: {
        _id: '10',
        ref: 100328,
      },
      lue: true,
      date: '2022-06-02T18:43:48.988+00:00',
    },
    {
      _id: '1235',
      envoyeur: {
        _id: '1',
      },
      recepteur: {
        _id: '3',
      },
      contenu: 'invitation',
      ticket: {
        _id: '1',
        ref: 100325,
      },
      lue: false,
      date: '2022-04-03T16:43:44.988+00:00',
    },
  ];

  let fakeMsgs: any[] = [
    {
      envoyeur: {
        _id: '1',
      },
      membre: {
        _id: '2',
      },
      message: {
        _id: '1111',
        envoyeur: {
          _id: '1',
        },
        contenu: 'Test',
        conversation: {
          _id: '1234',
        },
        lue: false,
        fJoint: [],
        date: '2022-04-06T13:12:37.974+00:00',
      },
    },
    {
      envoyeur: {
        _id: '3',
      },
      membre: {
        _id: '2',
      },
      message: {
        _id: '1122',
        envoyeur: {
          _id: '3',
        },
        contenu: 'Lorem',
        conversation: {
          _id: '1235',
        },
        lue: true,
        fJoint: [],
        date: '2022-04-06T13:12:37.974+00:00',
      },
    },
  ];

  let fakeEmployee: Employe = {
    _id: '5',
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

  let fakeEmployees: any[] = [
    {
      nom: 'Mahmoud becheikh',
    },
    {
      nom: 'Sahar jendoubi',
    },
    {
      nom: 'Ines ben mahmoud',
    },
  ];

  let fakeMsg: {
    _id: '1122',
    envoyeur: {
      _id: '3',
    },
    contenu: 'Lorem',
    conversation: {
      _id: '1235',
    };
    lue: true,
    fJoint: [],
    date: '2022-04-06T13:12:37.974+00:00',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatAutocompleteModule,
        SocketIoModule.forRoot(config),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        AuthService,
        NotificationService,
        SocketService,
        EmployeeService,
        ChatService,
      ],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit call', () => {
    const socketService = fixture.debugElement.injector.get(SocketService);
    const authService = fixture.debugElement.injector.get(AuthService);

    spyOn(component, 'afficherNotif').and.callThrough();
    spyOn(component, 'afficherMsg').and.callThrough();
 

    
    let spyNewMsg = spyOn(socketService, 'listen').and.returnValue(of(fakeMsg));
    let spyAuth = spyOn(authService, 'getAuth').and.returnValue(
      of(fakeEmployee)
    );
    let spyJoinedRoom = spyOn(socketService, 'emit')
    component.ngOnInit();
    expect(spyAuth).toHaveBeenCalled();
    expect(component.afficherMsg).toHaveBeenCalled();
    expect(component.afficherNotif).toHaveBeenCalled();
    expect(component.employe).toEqual(fakeEmployee);
    expect(spyJoinedRoom).toHaveBeenCalledWith('joinRoom',{id : component.employe?._id});
    expect(spyNewMsg).toHaveBeenCalledWith('newMsg');
  });

  it('should list notification ', () => {
    const service = fixture.debugElement.injector.get(NotificationService);
    spyOn(service, 'afficherRecep').and.returnValue(of(fakeNotifs));
    component.employe = fakeEmployee;
    component.afficherNotif();
    fixture.detectChanges();
    expect(component.notifications).toEqual(fakeNotifs);
    expect(component.nonLueNotif).toEqual(2);
    const notifElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#nonLueNotif')
    ).nativeElement;
    expect(notifElement.textContent).toContain('2');
  });

  it('should list messages ', () => {
    const service = fixture.debugElement.injector.get(ChatService);
    spyOn(service, 'afficherNonLue').and.returnValue(of(fakeMsgs));
    component.employe = fakeEmployee;
    component.afficherMsg();
    fixture.detectChanges();
    expect(component.messages).toEqual(fakeMsgs);
    expect(component.nonLueMsg).toEqual(1);
    const messageElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#nonLueMsg')
    ).nativeElement;
    expect(messageElement.textContent).toContain('1');
  });

  it('should emit on click', () => {
    spyOn(component.selectEmployeEvent, 'emit');
    component.select(fakeEmployee);
    expect(component.selectEmployeEvent.emit).toHaveBeenCalledWith(
      fakeEmployee
    );
  });

  it('should rand color', () => {
    let array = [1, 2, 3, 4];
    component.rand(array);
    expect(component.colors.length).toEqual(array.length);
  });

  it('should filter data', () => {
    component.employes = fakeEmployees;
    component.filterData('mahmoud');
    expect(component.employeFilter?.length).toEqual(2);
  });
});
