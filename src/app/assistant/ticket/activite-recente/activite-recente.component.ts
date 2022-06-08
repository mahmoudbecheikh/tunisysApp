import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-activite-recente',
  templateUrl: './activite-recente.component.html',
  styleUrls: ['./activite-recente.component.css']
})
export class ActiviteRecenteComponent implements OnInit {

  tickets: Ticket[] = [];
  p: number = 1;

  constructor(private ticketService: TicketService, private router : Router) {}

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.ticketService.afficherListe().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        const ticket = res[i];
        if (ticket.manuel == 'assistant') this.tickets.push(ticket);
      }
    });
  }

  detail(id: any) {
    const link = ['assistant/tickets/', id];
    this.router.navigate(link);
  }



  
}
