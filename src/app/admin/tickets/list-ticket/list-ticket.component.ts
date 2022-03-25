import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.afficherList()

  }

  afficherList() {
    this.ticketService.afficherListe().subscribe((res) => {
      this.tickets = res as Ticket[];
    });
  }
  toAdd() {
    this.router.navigate(['admin/tickets/add']);
  }

  goToUpdate(id: any) {
    const link = ['admin/tickets/update/', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {
    this.ticketService.supprimer(id).subscribe((res) => {
      this.afficherList()
    });
  }

  confirmer(id:any){
    this.ticketService.confirmer(id).subscribe((res) => {
      this.afficherList()
    });
  }

}
