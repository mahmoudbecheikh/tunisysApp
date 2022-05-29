import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { AgentGuard } from './agent.guard';

describe('AgentGuard', () => {
  let guard: AgentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers : [AuthService]
    });
    guard = TestBed.inject(AgentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
