import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  readonly baseURL = 'http://localhost:3000/mails';


  constructor(private http : HttpClient) { }

  readMails() {
    return this.http.get(this.baseURL);
  }

  envoyerMail(mail : any){
    return this.http.post(this.baseURL+'/email',mail)
  }
}
