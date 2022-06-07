import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';

import { ResetComponent } from './reset.component';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
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
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWUxMmE0NWZiYjVlYmI3OTA5NTNmYSIsInJvbGUiOjIsImlhdCI6MTY1NDM4NzIwNn0.JKSdY-NZQfi4ZuXbnkDOKMbYc1gc9Q52WiFBzhUtaBs'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      providers: [AuthService],
      declarations: [ResetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changer lezem tekhdem ', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'reset').and.returnValue(of({employe : fakeEmployee }));
    const spy = spyOn(authService, 'login').and.returnValue(of({token : token}));
    component.changer();
    expect(spy).toHaveBeenCalled();
    expect(localStorage.getItem("token")).toBeDefined()
  });

  
  it('invalid token ', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'reset').and.returnValue(of({invalid : true }));
    component.changer();
    expect(component.valid).toBeTruthy()
    const errorElement: HTMLInputElement = fixture.debugElement.query(
      By.css('h3')
    ).nativeElement;
    expect(errorElement.textContent).toEqual('Le lien que vous avez suivi a expiré ou invalide')
  });

    

});
