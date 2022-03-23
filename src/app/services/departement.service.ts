import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from 'src/models/departement';

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  readonly baseURL = 'http://localhost:3000/departements';

  constructor(private http: HttpClient) {}

  ajouter(departement: Departement): Observable<any> {
    return this.http.post(this.baseURL, departement);
  }

  afficherListe() {
    return this.http.get(this.baseURL);
  }
  afficherId(id: any): Observable<Departement> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  modifier(id: any, departement: Departement): Observable<Departement> {
    return this.http.put(this.baseURL + `/${id}`, departement);
  }

  supprimer(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  afficherNom(title: String): Observable<Departement> {
    return this.http.get(this.baseURL + `/dep/${title}`);
  }
}
