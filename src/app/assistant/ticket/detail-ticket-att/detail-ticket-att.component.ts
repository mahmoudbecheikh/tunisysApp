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
  formdata = new FormData();
  mails = [];
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
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      this.files = res.fJoint;
      let data = {
        from: res.emailClient,
        date: res.date,
        option: 'ALL',
      };
      this.mailService.afficherEnvoye(data).subscribe((mails) => {
        console.log(mails)
        this.mails.concat(mails);
      });
      this.mailService.afficherListe(data).subscribe((mails) => {
        console.log(mails)
        this.mails.concat(mails);
      });
    });
    this.createForm();
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
    });
  }

  envoyer() {
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('email', this.emailClient.value);
    this.formdata.append('text', this.text.value);
    this.mailService.envoyerMail(this.formdata).subscribe((res) => {
      this.myForm.reset();
      this.formdata = new FormData();
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
    }
  }
}
