import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin()
  }
  checkLogin(): boolean {
    if (!this.authService.LoggedIn()) {
      return true;
    }
    let role = this.authService.getRole()
      switch (role) {
        case 0:
          this.router.navigate(['/admin']);
          break;
        case 1:
          this.router.navigate(['/assistant']);
          break;
        case 2:
          this.router.navigate(['/agent']);
          break;
      }
    
    return false;
  }
}
