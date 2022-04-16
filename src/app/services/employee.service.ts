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

  afficherListe() {
    return this.http.get(this.baseURL);
  }
  afficherId(id: any): Observable<Employe> {
    return this.http.get(this.baseURL + `/${id}`);
  }

  afficherToken(token: any,tokenExpire:any): Observable<any> {
    return this.http.get(this.baseURL + `/${token}/${tokenExpire}`);
  }
  modifier(id: any, employee: Employe): Observable<any> {
    return this.http.put(this.baseURL + `/${id}`, employee);
  }

  supprimer(_id: string) :Observable<Employe> {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  afficherCin(cin: number): Observable<Employe> {
    console.log(cin)
    return this.http.get(this.baseURL + `/emp/${cin}`);
  }

  afficherEmail(email: String): Observable<Employe> {
    console.log(email)

    return this.http.get(this.baseURL + `/employee/${email}`);
  }
}
