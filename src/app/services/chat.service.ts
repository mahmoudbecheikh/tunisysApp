import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  downloadFile(file: String) {
    var body = { filename: file };
    return this.http.post('http://localhost:3000/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  modifierMessages(env: any,rec : any ,data : any): Observable<any> {
    return this.http.put(this.baseURL+`/${env}/${rec}`, data);
  }
}
