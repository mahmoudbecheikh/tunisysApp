import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';
import { SocketService } from '../services/socket.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,  SocketIoModule.forRoot(config) ,MatAutocompleteModule     ],
      providers: [
        AuthService,
        NotificationService,
        SocketService,
        EmployeeService,
        ChatService,
      ],
      declarations: [HeaderComponent],
      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
