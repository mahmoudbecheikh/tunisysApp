import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ticket } from 'src/models/ticket';
import { TicketService } from '../services/ticket.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tickets?: any[] = [];
  ticketFilter?: any[] = [];
  results?: Ticket[] = [];
  show: boolean = false;

  formRech: FormGroup = new FormGroup({});
  sujet: FormControl = new FormControl('', []);

  constructor(
    private ticketService: TicketService
  ) {}
  ngOnInit(): void {
  
    this.formRech = new FormGroup({
      sujet: this.sujet,
    });
    
    this.afficherListe()

    this.sujet.valueChanges.subscribe((response) => {
      if (response.trim()=='') this.ticketFilter = [];
      else {
        this.filterData(response);
        this.ticketFilter = [...new Set(this.ticketFilter)];
      }
    });
  }

  afficherListe(){
    this.ticketService.afficherListe().subscribe((res) => {
      for (const ticket of res) {
        if(ticket.statut=='resolu'){
          this.tickets?.push(ticket)
        }
      }
    });
  }

  filterData(enteredData: any) {
    this.ticketFilter = this.tickets?.filter((item) => {
      return item.sujet.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
    this.ticketFilter = [
      ...new Map(
        this.ticketFilter?.map((item) => [item['sujet'], item])
      ).values(),
    ];
  }

  find(ticket: any) {
    this.show = true;
    this.results = [];
    if (this.tickets)
      for (let item of this.tickets) {
        if (ticket == item.sujet) this.results?.push(item);
      }
  }

  findBtn(sujet: any) {
    this.show = true;
    this.results = [];
    this.results = this.tickets?.filter((item) => {
      return item.sujet.toLowerCase().indexOf(sujet.toLowerCase()) > -1;
    });
  }}
