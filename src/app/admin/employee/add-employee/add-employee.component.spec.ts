import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Departement } from 'src/models/departement';
import { Employe } from 'src/models/employe';
import { ListEmployeeComponent } from '../list-employee/list-employee.component';

import { AddEmployeeComponent } from './add-employee.component';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
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
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'admin/employees', component: ListEmployeeComponent },
        ]),
      ],
      providers: [EmployeeService, DepartementService],
      declarations: [AddEmployeeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('submitting a form emits an employe', () => {
    const service = fixture.debugElement.injector.get(EmployeeService);
    const spy = spyOn(service, 'ajouter').and.returnValue(of(fakeEmployee));
    expect(component.myForm.valid).toBeFalsy();
    component.prenom.setValue('Lorem');
    component.nom.setValue('Ipsum');
    component.cin.setValue('15510046');
    component.departement.setValue('');
    component.email.setValue('tunisys@gmail.com');
    component.mdp.setValue('Azerty33');
    component.tel.setValue('21789456');
    component.role.setValue('0');
    component.ajouter();
    expect(spy).toHaveBeenCalledWith(component.myForm.value);
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
