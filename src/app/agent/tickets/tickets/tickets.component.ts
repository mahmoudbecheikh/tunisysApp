import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListTicket();
  }

  getListTicket() {
    this.authService.getAuth().subscribe((res) => {
      this.ticketService.afficherEmploye(res._id).subscribe((res) => {
        this.tickets = res as Ticket[];
      });
    });
  }



  toMore(id: any) {
    const link = ['agent/tickets', id];
    this.router.navigate(link);
  }

  onDelete(id: any) {
    this.ticketService.supprimer(id).subscribe((res) => {
      this.getListTicket();
    });
  }

  onConfirm(id: any) {
    this.ticketService.confirmer(id).subscribe((res) => {
      this.getListTicket();
    });
  }
}
