import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { AssistantGuard } from './assistant.guard';

describe('AssistantGuard', () => {
  let guard: AssistantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers : [AuthService]

    });
    guard = TestBed.inject(AssistantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
