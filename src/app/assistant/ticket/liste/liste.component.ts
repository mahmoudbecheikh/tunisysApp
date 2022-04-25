import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent implements OnInit {
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



  supprimer(id: any) {
    this.ticketService.supprimer(id).subscribe((res) => {
      this.afficherListe();
    });
  }
}
