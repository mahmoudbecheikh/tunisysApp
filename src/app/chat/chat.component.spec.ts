import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { Employe } from 'src/models/employe';
import { Message } from 'src/models/message';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';

import { ChatComponent } from './chat.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let fakeMsg: {
    _id: '1122';
    envoyeur: {
      _id: '3';
    };
    contenu: 'Lorem';
    conversation: {
      _id: '1235';
    };
    lue: true;
    fJoint: [];
    date: '2022-04-06T13:12:37.974+00:00';
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

  let fakeMsgs : Message []= [
    {
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
    {
      _id: '1123',
      envoyeur: {
        _id: '3',
      },
      contenu: 'Lorem',
      conversation: {
        _id: '1235',
      },
      lue: false,
      fJoint: [],
      date: '2022-04-06T13:12:37.974+00:00',
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule , RouterTestingModule,ReactiveFormsModule ,SocketIoModule.forRoot(config)],
      providers : [AuthService,ChatService,SocketService],
      declarations: [ ChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const socketService = fixture.debugElement.injector.get(SocketService);
    spyOn(component, 'createForm').and.callThrough();
    spyOn(component, 'afficherEmploye').and.callThrough();
    let spyNewMsg = spyOn(socketService, 'listen').and.returnValue(of(fakeMsg));
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.afficherEmploye).toHaveBeenCalled();
    expect(spyNewMsg).toHaveBeenCalledWith('newMsg');
  });

  it('ngOnChanges', () => {
    component.employeSelected = fakeEmployee
    const service = fixture.debugElement.injector.get(AuthService);
    const chatService = fixture.debugElement.injector.get(ChatService);
    
    spyOn(service, 'getAuth').and.returnValue(of(fakeEmployee));
    let spyChat = spyOn(chatService, 'afficherConversation').and.returnValue(of(fakeMsgs));
    component.ngOnChanges()
    expect(component.employe).toEqual(fakeEmployee);
    expect(spyChat).toHaveBeenCalledWith(component.employe?._id,component.employeSelected._id)

  });

  it('employe connecte', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'getAuth').and.returnValue(of(fakeEmployee));
    component.afficherEmploye();
    expect(component.employe).toEqual(fakeEmployee);
  });


  it('submitting a form for send message', () => {
    const service = fixture.debugElement.injector.get(ChatService);
    const spy = spyOn(service, 'ajouterMessage').and.returnValue(of(fakeMsg));
    component.employeSelected = fakeEmployee ; 
    component.employe = fakeEmployee
    expect(component.myForm.valid).toBeFalsy();
    component.envoyeur.setValue(component.employeSelected);
    component.recepteur.setValue(component.employe);
    component.contenu.setValue('Lorem ipsum dolor sit amet');
    expect(component.myForm.valid).toBeTruthy();
    component.envoyer();
    expect(component.formdata.get('contenu')).toEqual(component.contenu.value);
    expect(spy).toHaveBeenCalledWith(component.formdata);
  });
});
