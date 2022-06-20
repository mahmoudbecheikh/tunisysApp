import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SocketService } from 'src/app/services/socket.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Employe } from 'src/models/employe';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  faire: Ticket[] = [];
  cours: Ticket[] = [];
  resolu: Ticket[] = [];
  changement: any[] = [];
  employe?: Employe;
  change = false;
  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router,
    private socketService: SocketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListTicket();
    this.socketService.listen('confirmNotif').subscribe((res) => {
      if (res) this.getListTicket();
    });
  }


  getListTicket() {
    this.changement = [];
    this.faire = [];
    this.cours = [];
    this.resolu = [];
    this.authService.getAuth().subscribe((res) => {
      if(res){
        this.employe = res 
        this.ticketService.afficherEmploye(res._id).subscribe((res) => {
          this.tickets = res;
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
      }

    });
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.change = true;
    }
  }



  quitter(idTicket: any, idEmp: any) {
    this.ticketService.quitter(idTicket, idEmp).subscribe((res) => {
      if (res) this.getListTicket();
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

  check() {
    this.changement = [];
    for (let i = 0; i < this.tickets.length; i++) {
      let ticket = this.tickets[i];
      let statut = '';
      let ticketModify;
      switch (ticket.statut) {
        case 'a faire':
          if (this.cours.includes(ticket)) statut = 'en cours';
          if (this.resolu.includes(ticket)) statut = 'resolu';
          break;
        case 'en cours':
          if (this.resolu.includes(ticket)) statut = 'resolu';
          break;
      }

      if (statut != '') {
        if (this.tickets[i].statut == 'en cours' && !ticket.rapport) {
          this.toastr.warning(
            'Il est strictement impératif de remplir le rapport de résolution pour que ce ticket soit considéré résolu',
            'Attention'
          );
        } else {
          ticketModify = {
            data: this.tickets[i],
            statut: statut,
          };
          this.changement.push(ticketModify);
        }
      }
    }
    if (this.changement.length > 0)
      this.ticketService.changerStatut({tickets :this.changement}).subscribe((res) => {
        if(res){
          this.getListTicket();
          this.toastr.info('', 'Changement effectué avec succès');
          this.change = false;
        }
      });
    else {
      this.changement = [];
      this.faire = [];
      this.cours = [];
      this.resolu = [];
      this.getListTicket();
      this.toastr.warning('', 'changement non autorisé');
      this.change = false;
    }
  }
}
