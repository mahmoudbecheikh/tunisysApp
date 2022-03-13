import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordStockComponent } from './dashbord-stock.component';

describe('DashbordStockComponent', () => {
  let component: DashbordStockComponent;
  let fixture: ComponentFixture<DashbordStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
