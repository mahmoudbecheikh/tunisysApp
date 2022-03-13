import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubcategoryComponent } from './update-subcategory.component';

describe('UpdateSubcategoryComponent', () => {
  let component: UpdateSubcategoryComponent;
  let fixture: ComponentFixture<UpdateSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
