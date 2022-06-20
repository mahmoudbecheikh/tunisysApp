import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { DashbordComponent } from 'src/app/admin/dashbord/dashbord.component';
import { TicketsComponent } from 'src/app/agent/tickets/tickets.component';
import { TicketAttComponent } from 'src/app/assistant/ticket/ticket-att/ticket-att.component';
import { AuthService } from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWUxMmE0NWZiYjVlYmI3OTA5NTNmYSIsInJvbGUiOjIsImlhdCI6MTY1NDM4NzIwNn0.JKSdY-NZQfi4ZuXbnkDOKMbYc1gc9Q52WiFBzhUtaBs';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'admin', component: DashbordComponent },
          { path: 'agent', component: TicketsComponent },
          { path: 'assistant', component: TicketAttComponent },
        ]),
      ],
      providers: [AuthService],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loggedIn', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'login').and.returnValue(of({ token: token }));
    component.onLogin();
    fixture.detectChanges();
    expect(localStorage.getItem('token')).toBeDefined();
  });

  it('should error', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'login').and.returnValue(of({ error: true }));
    component.onLogin();
    fixture.detectChanges();
    const errorElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#errorLog')
    ).nativeElement;
    expect(component.error).toBeTruthy();
    expect(errorElement.textContent).toContain(
      'Votre email ou votre mot de passe est incorrect'
    );
    expect(component.mdp.value).toEqual('');
  });

  it('return empty', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'login').and.returnValue(of(new Observable()));
    component.onLogin();
    fixture.detectChanges();
    expect(component.error).toBeTruthy();

  });

  it('should show icon', () => {
    let show = component.show;
    component.change();
    expect(component.show).toEqual(!show);
  });
});
