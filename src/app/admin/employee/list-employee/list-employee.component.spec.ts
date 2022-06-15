import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Departement } from 'src/models/departement';
import { Employe } from 'src/models/employe';

import { ListEmployeeComponent } from './list-employee.component';

describe('ListEmployeeComponent', () => {
  let component: ListEmployeeComponent;
  let fixture: ComponentFixture<ListEmployeeComponent>;
  let fakeEmployes: Employe[] = [
    {
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
    },
    {
      _id: '4',
      nomEmp: 'Ben ines',
      prenomEmp: 'Mahmoud',
      departement: undefined,
      cin: 15011136,
      email: 'string',
      mdp: 'Azerty',
      adresse: 'string',
      role: 0,
      tel: 20789456,
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
        RouterTestingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ToastrModule.forRoot(),
      ],
      providers: [EmployeeService, AuthService, DepartementService,ToastrService],
      declarations: [ListEmployeeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list employe isArray and length > 1  ', () => {
    const service = fixture.debugElement.injector.get(EmployeeService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeEmployes));
    component.afficherListe();
    expect(component.employees).toEqual(fakeEmployes);
  });

  it('should list departement   ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);
    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.listDepartement();
    expect(component.departementsArray).toEqual(fakeDepartements);
  });

  it('should supprimer', () => {
    const service = fixture.debugElement.injector.get(EmployeeService);
    const toastrService = fixture.debugElement.injector.get(ToastrService);
    const toastrSpy = spyOn(toastrService, 'success')
    const spy = spyOn(service, 'supprimer').and.returnValue(of(fakeEmployes[0]));
    const _id = '1';
    component.supprimer(_id);
    expect(spy).toHaveBeenCalledWith(_id);
    expect(toastrSpy).toHaveBeenCalled();
  });


});
