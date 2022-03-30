import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  readonly baseURL = 'http://localhost:3000/mails';

  constructor(private http: HttpClient) {}

  affcherListe(email:any , option:any):Observable<any> {
    return this.http.get(this.baseURL + `/${email}/${option}`);
  }

  envoyerMail(data: any) :Observable<any> {
    return this.http.post(this.baseURL + '/email', data);
  }

  supprimer(email :any ,uid:any){
    return this.http.delete(this.baseURL + `/${email}/${uid}`);
  }

  modifier(data : any){
    return this.http.put(this.baseURL + `/${data.email}/${data.uid}`,data);
  }
}
