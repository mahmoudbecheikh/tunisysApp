import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  ticket?: Ticket;
  id: any;
  files? : []

  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private httpClient : HttpClient
  ) {}
  

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      this.files = res.fJoint
      console.log(this.ticket);
    });
  }


  download(fileName :string){
    console.log(fileName)
  }



 
 
}
