import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TunisysApp';

  constructor(private ticketService :TicketService) {}

  ngOnInit(): void {
    this.ticketService.rappelle().subscribe(res=>{
    })
    // let btn = document.querySelector('#btn');
    // let sidebar = document.querySelector('.sidebar');
    // let searchBtn = document.querySelector('.bx-search');
    // this.isLoggedIn = this.authService.LoggedIn();
    // console.log(btn);
    // btn?.addEventListener('click', () => {
    //   sidebar?.classList.toggle('active');
    // });
    // searchBtn?.addEventListener('click', () => {
    //   sidebar?.classList.toggle('active');
    // });
  }
}
