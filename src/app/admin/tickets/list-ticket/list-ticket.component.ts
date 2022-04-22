import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  ticketsFilter: Ticket[] = [];
  departementsArray: Departement[] = [];
  option: FormControl = new FormControl();
  p: number = 1;

  statutsArray: string[] = ['en attente', 'a faire', 'en cours', 'resolu'];
  manuelsArray: string[] = ['admin', 'assistant', 'client'];

  form: FormGroup = new FormGroup({});
  departements: FormArray = new FormArray([]);
  statuts: FormArray = new FormArray([]);
  manuels: FormArray = new FormArray([]);

  constructor(
    private ticketService: TicketService,
    private depService: DepartementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afficherList();
    this.listDepartement();
    this.trier();
    this.form = new FormGroup({
      departements: this.departements,
      statuts: this.statuts,
      manuels: this.manuels,
    });
  }

  onCheckboxChange(formArray: FormArray, e: any) {
    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      formArray.value.forEach((item: FormControl) => {
        if (item == e.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submit();
  }

  submit() {
    let departements = this.departements.value;
    let statuts = this.statuts.value;
    let manuels = this.manuels.value;

    if(this.statuts.length==0 && this.departements.length==0 && this.manuels.length==0 ){
      this.ticketsFilter = this.tickets
    }
    else {
      this.ticketsFilter = this.tickets.filter(function (el) {
        return (
          departements.includes(el.departement?.nom) &&
          statuts.includes(el.statut) &&
          manuels.includes(el.manuel)
        );
      });
    }
    
  }

  trier() {
    this.option.valueChanges.subscribe((option) => {
      switch (option) {
        case 'date':
          this.ticketsFilter = this.ticketsFilter.sort((a: any, b: any) =>
            a.date > b.date ? 1 : -1
          );
          break;
        case 'manuel':
          this.ticketsFilter = this.ticketsFilter.sort((a: any, b: any) =>
            a.manuel > b.manuel ? 1 : -1
          );
          break;
        case 'departement':
          this.ticketsFilter = this.ticketsFilter.sort((a: any, b: any) =>
            a.departement.nom > b.departement.nom ? 1 : -1
          );
          break;
        case 'statut':
          this.ticketsFilter = this.ticketsFilter.sort((a: any, b: any) =>
            a.statut.toLowerCase() > b.statut.toLowerCase() ? 1 : -1
          );
          console.log(this.ticketsFilter)
          this.ticketsFilter.unshift(
            this.ticketsFilter.splice(
              this.ticketsFilter.findIndex((item) => item.statut === 'en attente'),
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
      this.departementsArray = res as Departement[];
    });
  }
  afficherList() {
    this.ticketService.afficherListe().subscribe((res) => {
      this.tickets = res as Ticket[];
      this.ticketsFilter = res;
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
