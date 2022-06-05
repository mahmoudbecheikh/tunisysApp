import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../services/auth.service';

import { DefaultComponent } from './default.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule ,SocketIoModule.forRoot(config),MatAutocompleteModule ,ToastrModule.forRoot(),MatFormFieldModule , MatInputModule ,BrowserAnimationsModule],
      providers : [AuthService],
      declarations: [ DefaultComponent, HeaderComponent  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
