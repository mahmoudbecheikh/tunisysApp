import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { Employe } from 'src/models/employe';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../securite/login/login.component';
import { AuthService } from '../services/auth.service';

import { DefaultComponent } from './default.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
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
        ReactiveFormsModule,
        SocketIoModule.forRoot(config),
        MatAutocompleteModule,
        ToastrModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [AuthService],
      declarations: [DefaultComponent, HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('employe connecte', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'getAuth').and.returnValue(of(fakeEmployee));
    component.getAuth();
    fixture.detectChanges();
    expect(component.employe).toEqual(fakeEmployee);
    let role = component.role;
    expect(role).toEqual('Admin');
    const roleElement: HTMLInputElement = fixture.debugElement.query(
      By.css('.job')
    ).nativeElement;
    expect(roleElement.textContent).toContain('Admin');
  });

  it('logout', () => {
    component.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
