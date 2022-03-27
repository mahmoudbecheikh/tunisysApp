import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { saveAs } from 'file-saver';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-detail-ticket-att',
  templateUrl: './detail-ticket-att.component.html',
  styleUrls: ['./detail-ticket-att.component.css'],
})
export class DetailTicketAttComponent implements OnInit {
  ticket?: Ticket;
  id: any;
  files?: [];
  localUrl? : any

  myForm: FormGroup = new FormGroup({});
  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  text: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  file : FormControl = new FormControl('')
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private mailService : MailService
  ) {}

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      email : this.emailClient,
      text : this.text,
      file : this.file
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      this.files = res.fJoint;
      console.log(this.ticket);
    });
    this.createForm()
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
    });
  }

  envoyer(){
    // this.mailService.envoyerMail(this.myForm.value).subscribe(res=>{
    //   console.log(res)
    // })
    console.log(this.myForm.value)
  }

  uploadMultiple(event: any) {
    const files: any = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(this.localUrl)
  }
    console.log(files)
    
  }

}
