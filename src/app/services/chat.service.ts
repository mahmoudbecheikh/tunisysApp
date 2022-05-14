import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly baseURL = 'http://localhost:3000/chat';

  constructor(private http: HttpClient) {}

  afficherConversation(env: any,rec : any): Observable<any> {
    return this.http.get(this.baseURL+`/${env}/${rec}`);
  }

  ajouterMessage(data : any): Observable<any> {
    return this.http.post(this.baseURL+'/message', data);
  }

  afficherNonLue(recepteur : any) {
    return this.http.get(this.baseURL+`/${recepteur}`)
  }

  modifierMessages(env: any,rec : any ,data : any): Observable<any> {
    return this.http.put(this.baseURL+`/${env}/${rec}`, data);
  }
}
