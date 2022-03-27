import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAttComponent } from './ticket-att.component';

describe('TicketAttComponent', () => {
  let component: TicketAttComponent;
  let fixture: ComponentFixture<TicketAttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
