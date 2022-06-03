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

  ajouter(ticket: any): Observable<any> {
    return this.http.post(this.baseURL, ticket);
  }

  afficherListe(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  afficherAttente(): Observable<any> {
    return this.http.get(this.baseURL+ `/tickets/attente`);
  }

  afficherId(id: any): Observable<Ticket> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  modifier(id: any, ticket: any): Observable<any> {
    return this.http.put(this.baseURL + `/${id}`, ticket);
  }

  modifierTags(id: any, tags: any): Observable<any> {
    return this.http.put(this.baseURL + `/tags/${id}`, tags);
  }

  suggestion(id:any) : Observable<any>{
    return this.http.get(this.baseURL + `/suggestion/${id}`);

  }

  changerStatut(tickets: any): Observable<any> {
    return this.http.put(this.baseURL, tickets);
  }

  confirmer(id: any): Observable<Ticket> {
    return this.http.get(this.baseURL + `/confirmation/${id}`);
  }

  quitter(idTicket: any, idEmp: any): Observable<any> {
    return this.http.get(this.baseURL + `/${idTicket}/${idEmp}`);
  }

  afficherEmploye(idEmp: any): Observable<any> {
    return this.http.get(this.baseURL + `/employee/${idEmp}`);
  }

  supprimer(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  uploadFiles(data: any) {
    return this.http.post(this.baseURL + '/fichiers', data);
  }

  rappelle():Observable<any>{
    return this.http.get(this.baseURL + '/ticket/rappelle');
  }

  downloadFile(file: String) {
    var body = { filename: file };
    return this.http.post('http://localhost:3000/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  reclamer(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/reclamation', data);
  }

  supprimerReclamation(id: any): Observable<any> {
    return this.http.delete('http://localhost:3000/reclamation' + `/${id}`);
  }
  afficherReclamation(): Observable<any> {
    return this.http.get('http://localhost:3000/reclamation');
  }

  afficherStat() : Observable<any>{
    return this.http.get('http://localhost:3000/stat');

  }
}
