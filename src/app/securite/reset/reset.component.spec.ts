import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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

  it('ngOnInit', () => {
    const service = fixture.debugElement.injector.get(EmployeeService);
    const spy = spyOn(service, 'afficherTokenMdp').and.returnValue(of(fakeEmployee));
    component.tokenExpire = 1652825461622
    component.token = '5607b023b988f8f48330a6f6ada5368fe3ffe2591c2ae8b947bcf3e0bb6d40bb'
    component.ngOnInit()

    expect(spy).toHaveBeenCalledWith(component.token,component.tokenExpire)
    expect(component.valid).toBeTruthy()
  });
});
