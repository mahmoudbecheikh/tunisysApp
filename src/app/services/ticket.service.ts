import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http : HttpClient) { }

  readonly baseURL = 'http://localhost:3000/tickets';


  addTicket(ticket: Ticket) : Observable<any> {
    return this.http.post(this.baseURL, ticket);
  }

  listTicket() {
    return this.http.get(this.baseURL);
  }
  getById(id: any):Observable<Ticket> {
    return this.http.get(this.baseURL + `/${id}`);
  }
  updateTicket(id : any,ticket: Ticket) {
    return this.http.put(this.baseURL + `/${id}`, ticket);
  }

  deleteTicket(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
