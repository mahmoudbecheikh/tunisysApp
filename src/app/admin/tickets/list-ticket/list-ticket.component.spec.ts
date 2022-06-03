import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketService } from 'src/app/services/ticket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListTicketComponent } from './list-ticket.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DepartementService } from 'src/app/services/departement.service';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ListTicketComponent', () => {
  let component: ListTicketComponent;
  let fixture: ComponentFixture<ListTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule ,RouterTestingModule , ReactiveFormsModule ,NgxPaginationModule,ToastrModule.forRoot() ],
      providers : [TicketService,DepartementService],
      declarations: [ ListTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
