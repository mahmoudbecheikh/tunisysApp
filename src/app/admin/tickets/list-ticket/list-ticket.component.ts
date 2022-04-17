import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css'],
})
export class ListTicketComponent implements OnInit {
  tickets: Ticket[] = [];
  departements: Departement[] = [];
  option: FormControl = new FormControl();
  constructor(
    private ticketService: TicketService,
    private depService: DepartementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afficherList();
    this.trier();
  }
  trier() {
    this.option.valueChanges.subscribe((option) => {
      switch (option) {
        case 'date':
          this.tickets = this.tickets.sort((a: any, b: any) =>
            a.date > b.date ? 1 : -1
          );
          break;
        case 'manuel':
          this.tickets = this.tickets.sort((a: any, b: any) =>
            a.manuel > b.manuel ? 1 : -1
          );
          break;
        case 'departement':
          this.tickets = this.tickets.sort((a: any, b: any) =>
            a.departement.nom > b.departement.nom ? 1 : -1
          );
          break;
        case 'statut':
          this.tickets = this.tickets.sort((a: any, b: any) =>
            a.statut.toLowerCase() > b.statut.toLowerCase() ? 1 : -1
          );
          this.tickets.unshift(
            this.tickets.splice(
              this.tickets.findIndex((item) => item.statut === 'en attente'),
              1
            )[0]
          );

          break;
      }
      console.log(option);
    });
  }

  listDepartement() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }
  afficherList() {
    this.ticketService.afficherListe().subscribe((res) => {
      this.tickets = res as Ticket[];
    });
  }
  toAdd() {
    this.router.navigate(['admin/tickets/add']);
  }

  detail(id: any) {
    const link = ['admin/tickets/', id];
    this.router.navigate(link);
  }

  goToUpdate(id: any) {
    const link = ['admin/tickets/update/', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {
    this.ticketService.supprimer(id).subscribe((res) => {
      this.afficherList();
    });
  }

  confirmer(id: any) {
    this.ticketService.confirmer(id).subscribe((res) => {
      console.log(res);
      console.log();
      this.afficherList();
    });
  }
}
