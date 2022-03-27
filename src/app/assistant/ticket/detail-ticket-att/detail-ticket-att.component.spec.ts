import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTicketAttComponent } from './detail-ticket-att.component';

describe('DetailTicketAttComponent', () => {
  let component: DetailTicketAttComponent;
  let fixture: ComponentFixture<DetailTicketAttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTicketAttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTicketAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
