import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employe } from 'src/models/employe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly baseURL = 'http://localhost:3000/employes';

  constructor(private http: HttpClient) {}

  ajouter(employee: Employe): Observable<any> {
    return this.http.post(this.baseURL, employee);
  }

  afficherListe() :Observable<any> {
    return this.http.get(this.baseURL);
  }
  afficherId(id: any): Observable<any> {
    return this.http.get(this.baseURL + `/${id}`);
  }

  afficherTokenMdp(token: any,tokenExpire:any): Observable<any> {
    return this.http.get(this.baseURL + `/${token}/${tokenExpire}`);
  }
  modifier(id: any, employee: any): Observable<any> {
    return this.http.put(this.baseURL + `/${id}`, employee);
  }

  supprimer(_id: string) :Observable<any> {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  afficherCin(cin: number): Observable<any> {
    return this.http.get(this.baseURL + `/emp/${cin}`);
  }

  afficherEmail(email: String): Observable<any> {
    return this.http.get(this.baseURL + `/employee/${email}`);
  }

  afficherToken(token: any): Observable<any> {
    return this.http.get(this.baseURL + `/verification/${token}`);
  }
}
