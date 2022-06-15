import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  statutsArray: string[] = ['en attente', 'a faire', 'en cours', 'resolu'];
  manuelsArray: string[] = ['admin', 'assistant', 'client'];
  form: FormGroup = new FormGroup({});
  option: FormControl = new FormControl();
  departements: FormArray = new FormArray([]);
  statuts: FormArray = new FormArray([]);
  manuels: FormArray = new FormArray([]);
  notes: FormArray = new FormArray([]);
  sujet : FormControl = new FormControl()
  ticketSelected? : Ticket 
  p: number = 1;

  constructor(
    private ticketService: TicketService,
    private depService: DepartementService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.afficherList();
    this.listDepartement();
    this.trier();
    this.createForm()
    
    this.sujet.valueChanges.subscribe(res=>{
      this.ticketsFilter = this.tickets?.filter((item) => {
        if(item.sujet)
        return item.sujet.toLowerCase().indexOf(res.toLowerCase()) > -1;
        else return
      });
    })
  }

  createForm(){
    this.form = new FormGroup({
      departements: this.departements,
      statuts: this.statuts,
      manuels: this.manuels,
      notes: this.notes,
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
    let notes = this.notes.value;
    if (
      this.statuts.length == 0 &&
      this.departements.length == 0 &&
      this.manuels.length == 0
    ) {
      this.ticketsFilter = this.tickets;
    } else {
      this.ticketsFilter = this.tickets.filter(function (el) {
        return (
          (departements.includes(el.departement?.nom) ||
            departements.length == 0) &&
          (statuts.includes(el.statut) || statuts.length == 0) &&
          (manuels.includes(el.manuel) || manuels.length == 0) &&
          ( ( el.feedBack &&  notes.includes(String(el.feedBack.note))) || notes.length == 0)
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
          this.ticketsFilter.unshift(
            this.ticketsFilter.splice(
              this.ticketsFilter.findIndex(
                (item) => item.statut === 'en attente'
              ),
              1
            )[0]
          );

          break;
      }
    });
  }

  verify(id: any) {
    for (let i = 0; i < this.tickets.length; i++) {
      let ticket = this.tickets[i];
      if (ticket._id == id) {
        if (
          ticket.dateLimite &&
          new Date(ticket?.dateLimite).getTime() < Date.now()
        )
          return true;
        else return false;
      }
    }
    return true;
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



  

  supprimer(id: any) {
    this.ticketService.supprimer(id).subscribe((res) => {
      this.toastr.success('', 'Ticket supprimé avec succès!');
      //if(this.t)
      this.afficherList();
    });
  }

  selectTicket(ticket:Ticket){
    this.ticketSelected = ticket
  }

  confirmer(id: any) {
    this.ticketService.confirmer(id).subscribe((res) => {

      this.afficherList();
    });
  }
}
