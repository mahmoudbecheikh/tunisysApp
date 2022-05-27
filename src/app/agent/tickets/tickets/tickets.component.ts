import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SocketService } from 'src/app/services/socket.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Employe } from 'src/models/employe';

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
  employe?: Employe;
  change = false;
  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router,
    private empService: EmployeeService,
    private socketService : SocketService
  ) {}

  ngOnInit(): void {
    this.getListTicket();
    this.getAuth();
    this.socketService.listen('confirmNotif').subscribe(res=>{
      if(res)
      this.getListTicket()
    })
  }

  getAuth() {
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
    });
  }

  getListTicket() {
    this.changement = [];
    this.faire = [];
    this.cours = [];
    this.resolu = [];
    this.authService.getAuth().subscribe((res) => {
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
      this.change = true

      // if (Number(event.container.id) > Number(event.previousContainer.id)) {
      //   transferArrayItem(
      //     event.previousContainer.data,
      //     event.container.data,
      //     event.previousIndex,
      //     event.currentIndex
      //   );
      // } else {
      //   console.log('Tnajemch twakher');
      // }
      // switch (event.container.id) {
      //   case 'faireListe':
      //     if (event.previousContainer.data )
      //       this.change = false;
      //     else this.change = true;

      //     break;
      //   case 'coursListe':
      //     console.log(event.container.data)
      //     console.log(this.cours)
      //     if (this.arraysAreEqual(event.container.data, this.cours))
      //     this.change = false;
      //     else this.change = true;

      //     break;
      //   case 'resoluListe':
      //     if (this.arraysAreEqual(event.container.data, this.resolu))
      //     this.change = false;
      //     else this.change = true;
      //     break;
      // }
      // console.log(this.change);
    }
  }

  arraysAreEqual(ary1: any, ary2: any) {
    return ary1.join('') == ary2.join('');
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

  detail(id: any) {
    const link = ['agent/tickets/', id];
    this.router.navigate(link);
  }

  quitter(idTicket : any,idEmp : any) {
    this.ticketService
      .quitter(idTicket, idEmp)
      .subscribe((res) => {
        if(res)
        this.getListTicket()
      });
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
       
        if(this.tickets[i].statut=='en cours' && !ticket.rapport){
          console.log('Lezmk tekteb rapport')
        }
        else {
          ticketModify = {
            data: this.tickets[i],
            statut: statut,
          };
          this.changement.push(ticketModify);

        } 
      }
    }
    if (this.changement.length > 0)
      this.ticketService.changerStatut(this.changement).subscribe((res) => {
        // this.changement = [];
        // this.faire = [];
        // this.cours = [];
        // this.resolu = [];
        this.getListTicket();
        console.log('Hawka badaltk denya');

      });
    else {
      this.changement = [];
      this.faire = [];
      this.cours = [];
      this.resolu = [];
      this.getListTicket();
      console.log('famech jdid');
    }
  }
}
