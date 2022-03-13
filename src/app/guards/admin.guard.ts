import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService : AuthService , private router : Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject)=>{
        if(this.authService.LoggedIn()==true){
          let role = this.authService.getRole();
          if (role !== 0) {
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
