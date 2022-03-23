import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {
  
  myForm: FormGroup = new FormGroup({});
  rapport: FormControl = new FormControl('', {});
  ticket? : Ticket 
  id : any
  constructor(private tickService: TicketService, private router: Router,private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      rapport: this.rapport,
    });
     this.id = this.activatedRoute.snapshot.params['id']
    this.tickService.afficherId(this.id).subscribe(res=>{
      this.ticket = res 
      console.log(this.ticket)
    })
  }
  onSubmit() {
    console.log(this.myForm.value)
    if (!this.ticket?.rapport) {
      return;}
    this.ticket.rapport = this.rapport.value
    this.tickService.modifier(this.id,this.ticket).subscribe(res=>{
      console.log(res)
      this.reset()
    })
  }
  reset(){
    this.rapport.setValue('')
  }

}
