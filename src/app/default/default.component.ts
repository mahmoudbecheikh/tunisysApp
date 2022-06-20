import { Component, Input, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  employe?: Employe;
  isLoggedIn = false;
  nomEmp?: string;
  role?: any;
  employeSelected: any;
  enLigne: any[] = [];
  connecte: boolean = false;
  constructor(
    private ticketService: TicketService,
    private socketService: SocketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.LoggedIn();
    if (this.isLoggedIn == true) {
      this.getAuth();
    } else {
      this.router.navigate(['/login']);
    }
    let date = new Date();
    if (date.getHours() == 0) {
      this.ticketService.rappelle().subscribe((res) => {});
    }
  }
  open() {
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.socketService.emit('forceDisconnect',{ id: this.employe?._id });
  }
  getAuth() {
    this.authService.getAuth().subscribe((res) => {
      if (res) {
        this.socketService.emit('joinRoom', { id: res?._id });
        this.socketService.listen('enLigne').subscribe((res) => {
          this.enLigne = res;
        });
        this.employe = res;
        this.nomEmp = res.prenomEmp;
        switch (res.role) {
          case 0:
            this.role = 'Admin';
            break;
          case 1:
            this.role = 'Assistant';
            break;
          case 2:
            this.role = 'Agent';
            break;
        }
      }
    });
  }
  select(event: any) {
    this.connecte = false;
    if (event) this.employeSelected = event;
    for (const employe of this.enLigne) {
      if (employe.id == event?._id) {
        this.connecte = true;
        break;
      }
    }
  }

  deselect(event: any) {
    if (event) {
      this.employeSelected = undefined;
      this.connecte = false;
    }
  }
}
