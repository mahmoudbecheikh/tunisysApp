import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:3000/tickets';

  ajouter(ticket: Ticket): Observable<any> {
    return this.http.post(this.baseURL, ticket);
  }

  afficherListe() :Observable<any>{
    return this.http.get(this.baseURL);
  }
  afficherId(id: any): Observable<Ticket> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  modifier(id: any, ticket: any):Observable<any> {
    return this.http.put(this.baseURL + `/${id}`, ticket);
  }

  changerStatut(tickets : any):Observable<any> {
    return this.http.put(this.baseURL, tickets);
  }

  confirmer(id: any): Observable<any> {
    return this.http.get(this.baseURL + `/confirmation/${id}`);
  }

  afficherEmploye(idEmp: any): Observable<any> {
    return this.http.get(this.baseURL + `/employee/${idEmp}`);
  }

  supprimer(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


  uploadFiles(data:any){
    return this.http.post('http://localhost:3000/multiplefiles',data) ;
}

  downloadFile(file:String){
    var body = {filename:file};
    return this.http.post('http://localhost:3000/download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}
}
