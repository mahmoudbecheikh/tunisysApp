import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-att',
  templateUrl: './ticket-att.component.html',
  styleUrls: ['./ticket-att.component.css'],
})
export class TicketAttComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService,private router :Router) {}

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.ticketService.afficherListe().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        const ticket = res[i];
        if ((ticket.statut == 'en attente')) this.tickets.push(ticket);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
  }

  confirmer(id: any) {
    this.ticketService.confirmer(id).subscribe((res) => {
      if(res!=null)
      this.afficherListe();
    });
  }

  consulter(id: any) {
    const link = ['assistant/tickets', id];
    this.router.navigate(link);  }

  supprimer(id: any) {}
}
