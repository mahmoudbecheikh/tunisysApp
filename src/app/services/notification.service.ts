import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly baseURL = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  envoyer(data: any) {
    return this.http.post(this.baseURL, data);
  }
  confirmer(id: any) : Observable<any>{
    return this.http.get(this.baseURL + `/confirmation/${id}`);
  }
  afficherRecep(id: any) {
    return this.http.get(this.baseURL + `/recep/${id}`);
  }
  afficherEnv(id: any) {
    return this.http.get(this.baseURL + `/env/${id}`);
  }
  supprimer(_id: string) :Observable<any> {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  marquer(data:any){
    return this.http.put(this.baseURL , data);
  }
}
