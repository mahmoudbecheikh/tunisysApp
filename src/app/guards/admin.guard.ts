import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private authService : AuthService , private router : Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject)=>{
        if(this.authService.LoggedIn()==true){
          let token: any = localStorage.getItem('token');
          let decodeToken = this.helper.decodeToken(token);
          if (decodeToken.role !== 0) {
            resolve(false)
          }
        resolve(true)
      }
      else{
        this.router.navigate(['/login'])
        localStorage.removeItem('token')
        resolve(false)
      }
      })  
    }
  
}
