import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

import { ActiviteRecenteComponent } from './activite-recente.component';

describe('ActiviteRecenteComponent', () => {
  let component: ActiviteRecenteComponent;
  let fixture: ComponentFixture<ActiviteRecenteComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ToastrModule.forRoot()],
      providers: [TicketService],
      declarations: [ ActiviteRecenteComponent ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteRecenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
