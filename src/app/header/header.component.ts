import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications: any;
  employe?: Employe;
  tickets?: any[] = [];
  ticketFilter?: any[] = [];
  results?: any[] = [];
  show: boolean = false;

  formRech: FormGroup = new FormGroup({});
  sujet: FormControl = new FormControl('', []);
  @Output() resultsToSibling = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private notifService: NotificationService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
      this.afficherNotif();
    });
    this.formRech = new FormGroup({
      sujet: this.sujet,
    });
    
    this.ticketService.afficherListe().subscribe((res) => {
      this.tickets = res;
    });
    this.sujet.valueChanges.subscribe((response) => {
      if (response.trim()=='') this.ticketFilter = [];
      else {
        this.filterData(response);
        this.ticketFilter = [...new Set(this.ticketFilter)];
      }
    });
  }

  afficherNotif() {
    this.notifService.afficherRecep(this.employe?._id).subscribe((res) => {
      this.notifications = res;
    });
  }

  confirmer(notif: any) {
    this.notifService.confirmer(notif._id).subscribe((res) => {
      this.supprimer(notif);
    });
  }
  supprimer(notif: any) {
    this.notifService.supprimer(notif._id).subscribe((res) => {
      this.afficherNotif();
    });
  }
  marquer() {
    let notif = this.notifications.filter(function (el: any) {
      return el.lue == false;
    });
    this.notifService.marquer(notif).subscribe((res) => {
      this.afficherNotif();
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
    this.resultsToSibling.emit(this.results);
  }
}
