import { HttpClientTestingModule } from '@angular/common/http/testing';
import { error } from '@angular/compiler/src/util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Employe } from 'src/models/employe';

import { ChangeComponent } from './change.component';

describe('ChangeComponent', () => {
  let component: ChangeComponent;
  let fixture: ComponentFixture<ChangeComponent>;

  let employe: Employe = {
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
        RouterTestingModule,
      ],
      providers: [AuthService],
      declarations: [ChangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shyh', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'getAuth').and.returnValue(of(employe));
    spyOn(service, 'change').and.returnValue(of(true));
    component.changer();
    expect(spy).toHaveBeenCalled();
  });
 
});
