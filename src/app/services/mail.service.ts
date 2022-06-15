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

  afficherDiscussion(data: any): Observable<any> {
    return this.http.get(this.baseURL+'/discussion', { params: data });
  }

  envoyerMail(data: any): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  supprimer( uid: any) : Observable<any> {
    return this.http.delete(this.baseURL + `/${uid}`);
  }

  marquerLue(uid: any) : Observable<any>{
    return this.http.get(this.baseURL + `/email/${uid}`);
  }

  ajouterReponse(data : any): Observable<any> {
    return this.http.post(this.baseURL+'/reponses', data);
  }

  afficherReponses() :Observable<any>{
    return this.http.get(this.baseURL+'/reponses');
  }
  supprimerReponse(id: any) : Observable<any>{
    return this.http.delete(this.baseURL + `/reponses/${id}`);
  }
}
