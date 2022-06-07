import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let service: AuthService;

  const mockUrls = ['/admin', '/admin/employees'];
  const dummyRoute = {} as ActivatedRouteSnapshot;
  function mockRouterState(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot;
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });
    guard = TestBed.inject(AdminGuard);
    service = TestBed.inject(AuthService);
    spyOn(service, 'LoggedIn').and.returnValue(true);
    spyOn(service, 'getRole').and.returnValue(0);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  mockUrls.forEach((mockUrl) => {
    describe('and navigates to a guarded route configuration', () => {
      it('grants route access', () => {
        const canActivate = guard.canActivate(
          dummyRoute,
          mockRouterState(mockUrl)
        );
        expect(canActivate).toEqual(true);
      });
    });
  });
});
