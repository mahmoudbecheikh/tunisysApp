import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';

import { ListEmployeeComponent } from './list-employee.component';

describe('ListEmployeeComponent', () => {
  let component: ListEmployeeComponent;
  let fixture: ComponentFixture<ListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,NgxPaginationModule,ToastrModule.forRoot()],
      providers: [EmployeeService, AuthService, DepartementService],
      declarations: [ ListEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
