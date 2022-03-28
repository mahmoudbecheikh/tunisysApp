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
  localUrl?: any;

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
  file: FormControl = new FormControl('');
  fileSource: FormControl = new FormControl('', [Validators.required]);
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private mailService: MailService
  ) {}

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      email: this.emailClient,
      text: this.text,
      file: this.file,
      fileSource: this.fileSource,
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      this.files = res.fJoint;
      console.log(this.ticket);
    });
    this.createForm();
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
    });
  }

  envoyer() {
    const formData = new FormData();
    Object.keys(this.myForm.controls).forEach((key) => {
      let formC = this.myForm.get(key);
      formData.append(key, formC?.value);
    });
    this.mailService.envoyerMail(formData).subscribe(res=>{
      console.log(res)
    })


    console.log(formData);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }
}
