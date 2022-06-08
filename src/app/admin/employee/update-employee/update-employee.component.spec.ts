import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';

import { UpdateEmployeeComponent } from './update-employee.component';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateEmployeeComponent;
  let fixture: ComponentFixture<UpdateEmployeeComponent>;
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers: [EmployeeService,DepartementService],
      declarations: [ UpdateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('afficher employe', () => {

    const service = fixture.debugElement.injector.get(EmployeeService);
    spyOn(service, 'afficherId').and.returnValue(of(fakeEmployee));
    component.ngOnInit()
    expect(component.employe).toEqual(fakeEmployee);
    fixture.detectChanges();
    const emailElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    if(fakeEmployee.email)
    expect(emailElement.value).toContain(fakeEmployee.email)
    expect(component.departement.validator).toBeNull()
  });

  it('validator departement famech', () => {
    component.role.setValue(0);
    component.changeValue();
    expect(component.departement.validator).toBeNull();
  });

  it('validator departement fama', () => {
    component.role.setValue(2);
    component.changeValue();
    expect(component.departement.validator).not.toBeNull();
  });
});
