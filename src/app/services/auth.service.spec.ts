import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWUxMmE0NWZiYjVlYmI3OTA5NTNmYSIsInJvbGUiOjIsImlhdCI6MTY1NDM4NzIwNn0.JKSdY-NZQfi4ZuXbnkDOKMbYc1gc9Q52WiFBzhUtaBs'
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(AuthService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    localStorage.setItem('token', token);
    let role = String(service.getRole() ) 
    expect(role).toEqual('2')
  });
});
