import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartementComponent } from './update-departement.component';

describe('UpdateDepartementComponent', () => {
  let component: UpdateDepartementComponent;
  let fixture: ComponentFixture<UpdateDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDepartementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
