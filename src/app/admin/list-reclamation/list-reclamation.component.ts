import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css'],
})
export class ListReclamationComponent implements OnInit {
  reclamations: any[] = [];
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.ticketService.afficherReclamation().subscribe((res) => {
      this.reclamations = res;
    });
  }

  supprimer(id: any) {
    this.ticketService.supprimerReclamation(id).subscribe((res) => {
      this.afficherListe();
    });
  }
}
