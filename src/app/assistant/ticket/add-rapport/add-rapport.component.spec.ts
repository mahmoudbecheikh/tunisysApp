import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RapportService } from 'src/app/services/rapport.service';
import { TicketService } from 'src/app/services/ticket.service';

import { AddRapportComponent } from './add-rapport.component';

describe('AddRapportComponent', () => {
  let component: AddRapportComponent;
  let fixture: ComponentFixture<AddRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ToastrModule.forRoot()],
      providers: [RapportService,TicketService,AuthService],
      declarations: [ AddRapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
