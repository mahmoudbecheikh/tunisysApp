import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private titleService: Title) {
    titleService.setTitle("Ticket'Sys");}

  ngOnInit(): void {
  }
}
