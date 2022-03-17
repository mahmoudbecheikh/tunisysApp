import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrpuntsComponent } from './emrpunts.component';

describe('EmrpuntsComponent', () => {
  let component: EmrpuntsComponent;
  let fixture: ComponentFixture<EmrpuntsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrpuntsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrpuntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
