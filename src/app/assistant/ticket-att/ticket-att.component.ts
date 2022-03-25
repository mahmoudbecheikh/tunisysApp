import { Component, OnInit ,ViewChild  } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-ticket-att',
  templateUrl: './ticket-att.component.html',
  styleUrls: ['./ticket-att.component.css']
})
export class TicketAttComponent implements OnInit {

  tickets : Ticket[] = []

  constructor(private ticketService : TicketService) { }

  ngOnInit(): void {
    this.ticketService.afficherListe().subscribe(res=>{
      this.tickets = res ;
    })
  }
  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
  }

  confirmer(id:any){

  }

  supprimer(id:any){
    
  }



}
