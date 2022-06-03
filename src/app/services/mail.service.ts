import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  readonly baseURL = 'http://localhost:3000/mails';

  constructor(private http: HttpClient) {}

  afficherListe(data: any): Observable<any> {
    return this.http.get(this.baseURL, { params: data });
  }

  ajouterReponse(data : any): Observable<any> {
    return this.http.post(this.baseURL+'/brouillon', data);
  }

  afficherReponses() :Observable<any>{
    return this.http.get(this.baseURL+'/brouillon');
  }
  supprimerReponse(id: any) : Observable<any>{
    return this.http.delete(this.baseURL + `/${id}`);
  }

  afficherDiscussion(data: any): Observable<any> {
    return this.http.get(this.baseURL+'/discussion', { params: data });
  }

  envoyerMail(data: any): Observable<any> {
    return this.http.post(this.baseURL + '/email', data);
  }

  supprimer(email: any, uid: any) : Observable<any> {
    return this.http.delete(this.baseURL + `/${email}/${uid}`);
  }

  modifier(data: any) : Observable<any>{
    return this.http.put(this.baseURL + `/${data.email}/${data.uid}`, data);
  }
}
