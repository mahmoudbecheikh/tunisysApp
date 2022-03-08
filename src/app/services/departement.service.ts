import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from 'src/models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  readonly baseURL = 'http://localhost:3000/Departements';


  constructor(private http : HttpClient) { }

  addDepartement(departement: Departement) : Observable<any> {
    return this.http.post(this.baseURL, departement);
  }

  listDepartement() {
    return this.http.get(this.baseURL);
  }
  getById(id: any):Observable<Departement> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  updateDepartement(id : any,departement: Departement) :Observable<Departement>{
    return this.http.put(this.baseURL + `/${id}`, departement);
  }

  deleteDepartement(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  getByTitle(title: String):Observable<any> {
    return this.http.get(this.baseURL + `/dep/${title}`);
  }
}
