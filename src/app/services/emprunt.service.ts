import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Emprunt } from 'src/models/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  readonly baseURL = 'http://localhost:3000/emprunts';


  constructor(private http : HttpClient) { }

  addEmprunt(emprunt: Emprunt) : Observable<any> {
    return this.http.post(this.baseURL, emprunt);
  }

  confirmerEmprunt(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }

  listEmprunt() {
    return this.http.get(this.baseURL);
  }
  getById(id: any):Observable<Emprunt> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  updateEmprunt(id : any,emprunt: Emprunt) :Observable<Emprunt>{
    return this.http.put(this.baseURL + `/${id}`, emprunt);
  }

  deleteEmprunt(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
