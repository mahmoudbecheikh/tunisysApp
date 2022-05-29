import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

import { DetailTicketComponent } from './detail-ticket.component';

describe('DetailTicketComponent', () => {
  let component: DetailTicketComponent;
  let fixture: ComponentFixture<DetailTicketComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ToastrModule.forRoot(), SocketIoModule.forRoot(config)],
      providers: [TicketService],
      declarations: [ DetailTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('lezem fama ticket', () => {
  });

});
