import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css'],
})
export class DetailTicketComponent implements OnInit {
  ticket?: Ticket;
  tickets?: any[] = [];
  ticketFilter?: any[] = [];
  results?: any[] = [];
  id: any;
  show: boolean = false;
  rapportModify? : any[]
  formRech: FormGroup = new FormGroup({});
  formRapport: FormGroup = new FormGroup({});
  sujet: FormControl = new FormControl('', []);
  rapport: FormControl = new FormControl('', [Validators.required]);
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  createForm() {
    this.formRech = new FormGroup({
      sujet: this.sujet,
    });
    this.formRapport = new FormGroup({
      rapport: this.rapport,
    });
  }

  ngOnInit(): void {
    this.ticketService.afficherListe().subscribe((res) => {
      this.tickets = res;
    });

    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      // this.rapportModify = res.rapport

    });

    this.createForm();

    this.sujet.valueChanges.subscribe((response) => {
      this.filterData(response);
      this.ticketFilter = [...new Set(this.ticketFilter)];
      console.log(this.ticketFilter);
    });
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
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
        console.log(item);
        if (ticket == item.sujet) this.results?.push(item);
      }
  }

  findBtn(sujet: any) {
    this.show = true;
    this.results = [];
    this.results = this.tickets?.filter((item) => {
      return item.sujet.toLowerCase().indexOf(sujet.toLowerCase()) > -1;
    });
  }

  modifier() {
    
    let ticketModify = {
      sujet: this.ticket?.sujet,
      departement: this.ticket?.departement,
      description: this.ticket?.description,
      emailClient: this.ticket?.emailClient,
      nomClient: this.ticket?.nomClient,
      telClient: this.ticket?.telClient,
      adresse: this.ticket?.adresse,
      siteWeb: this.ticket?.siteWeb,
      statut: this.ticket?.statut,
      rapport: this.rapport.value,
    };
    this.ticketService.modifier(this.ticket?._id, ticketModify).subscribe((res) => {
        this.ticket = res;
        this.formRapport.reset();
      });
  }

  editRapport(i:any){

    if(this.rapportModify)
    this.rapport.setValue(this.rapportModify[i]);
    
  }
}
