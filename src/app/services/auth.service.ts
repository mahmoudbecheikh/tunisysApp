import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employe } from 'src/models/employe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();
  logged = false;
  id: any;
  role: any;
  readonly baseURL = 'http://localhost:3000/';


  constructor(private http: HttpClient, private router: Router) {

  }

  login(data: any): Observable<any> {
    return this.http.post(this.baseURL+'login', data);
  }

  forget(email: string) : Observable<any>{
    return this.http.post(this.baseURL+'forget', email);
  }

  reset(data: any, token: any): Observable<any> {
    return this.http.post(this.baseURL+`reset/${token}`, data);
  }

  change(data: any, id: string): Observable<any> {
    return this.http.put(this.baseURL+`change/${id}`, data);
  }

  getAuth(): Observable<any> {
    try {
      let token: any = localStorage.getItem('token');
      let decodeToken = this.helper.decodeToken(token);
      this.id = decodeToken.id;
      this.role = decodeToken.role;
      return this.http.get(this.baseURL+`employes/${this.id}`);

    } catch (error) {
      return new Observable()
    }
 
  }

  getRole(): number {
    try {
      let token: any = localStorage.getItem('token');
      let decodeToken = this.helper.decodeToken(token);
      this.id = decodeToken.id;
      this.role = decodeToken.role;
      return this.role
    } catch (error) {
      return -1;
    }
  }

  LoggedIn() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    if (token) {
      this.http.get( this.baseURL+`token/${token}`).subscribe((res) => {
        if (!res) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
    }

    return true;
  }
}
