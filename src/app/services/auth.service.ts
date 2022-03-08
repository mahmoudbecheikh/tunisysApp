import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employee } from 'src/models/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data);
  }

  getAdmin(): Observable<Employee> {
    let token: any = localStorage.getItem('token');
    let decodeToken = this.helper.decodeToken(token);
    let id = decodeToken.id;
    return this.http.get('http://localhost:3000/employees/' + id);
  }

  LoggedIn() {
    let token: any = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    if (this.helper.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
