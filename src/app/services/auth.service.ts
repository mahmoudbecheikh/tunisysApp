import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employe } from 'src/models/employe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();
  logged = false ;
  constructor(private http: HttpClient,private router :Router) {}

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data);
  }

  forget(email: string) {
    return this.http.post('http://localhost:3000/forget', email);
  }
  
  reset(data: any, token: any): Observable<any> {
    return this.http.post('http://localhost:3000/reset' + `/${token}`, data);
  }

  change(data:any,id:any) : Observable<any>{
    return this.http.put('http://localhost:3000/change' + `/${id}`, data);
  }

  getAuth(): Observable<any> {
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);
    let id = decodeToken.id;
    return this.http.get('http://localhost:3000/employes/' + id);
  }

  getRole(): number {
    try {
      let token: any = localStorage.getItem('token');
      let decodeToken = this.helper.decodeToken(token);
      let role = decodeToken.role;
      return role;
    } catch (error) {
      return -1
    }

  }

  LoggedIn() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    if(token){
      this.http.get('http://localhost:3000/token/' +token).subscribe(res=>{
        if(!res){
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      
    })
    }
    if (this.helper.isTokenExpired(token)) {
      console.log('expired');
      return false;
    }
    return true;
  }
}
