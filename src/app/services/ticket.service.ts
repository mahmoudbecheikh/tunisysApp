import { HttpClient } from '@angular/common/http';
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

  afficherListe() {
    return this.http.get(this.baseURL);
  }
  afficherId(id: any): Observable<Ticket> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  modifier(id: any, ticket: Ticket) {
    return this.http.put(this.baseURL + `/${id}`, ticket);
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
}
