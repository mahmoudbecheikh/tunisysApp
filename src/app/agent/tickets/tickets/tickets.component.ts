import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
  tickets: any[] = [];
  faire: any[] = [];
  cours: any[] = [];
  resolu: any[] = [];
  changement: any[] = [];

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
        this.tickets=res;
        for (let i = 0; i < res.length; i++) {
          let ticket = res[i];
          switch (ticket.statut) {
            case 'a faire':
              this.faire.push(ticket);
              break;
            case 'en cours':
              this.cours.push(ticket);
              break;
            case 'resolu':
              this.resolu.push(ticket);
              break;
          }
        }
      });
    });
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      console.log(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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

  detail(id:any){
    const link = ['agent/tickets/', id];
    this.router.navigate(link);
  }

  check() {

    this.changement=[]
    for (let i = 0; i < this.tickets.length; i++) {
      let ticket =this.tickets[i] ;
      let statut = '';
      let ticketModify ;
      switch (ticket.statut) {

        case 'a faire':
          if (this.cours.includes(ticket)) statut = 'en cours';
          if (this.resolu.includes(ticket)) statut = 'resolu';
          break;
        case 'en cours':
          if (this.faire.includes(ticket)) statut = 'a faire';
          if (this.resolu.includes(ticket)) statut = 'resolu';
          break;
        case 'resolu':
          if (this.faire.includes(ticket)) statut = 'a faire';
          if (this.cours.includes(ticket)) statut = 'en cours';
          break;
      }

      if(statut!=''){
        ticketModify = {
          data : this.tickets[i],
          statut : statut
        }
        this.changement.push(ticketModify)
      }
    }
    if(this.changement.length>0)
    this.ticketService.changerStatut(this.changement).subscribe(res=>{
      console.log(this.changement)
    })
    else console.log('famech jdid')
  }
}
