import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { saveAs } from 'file-saver';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { AuthService } from 'src/app/services/auth.service';
import { Employe } from 'src/models/employe';

@Component({
  selector: 'app-detail-ticket-att',
  templateUrl: './detail-ticket-att.component.html',
  styleUrls: ['./detail-ticket-att.component.css'],
})
export class DetailTicketAttComponent implements OnInit {
  employe? : Employe
  ticket?: Ticket;
  id: any;
  files?: [];
  attachements?: any = [];
  localUrl?: any;
  formdata = new FormData();
  mails: any = [];

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
    private mailService: MailService,
    private router : Router,
    private authService : AuthService
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

    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
    })

    this.ticketService.afficherId(this.id).subscribe((res) => {
      console.log(res);
      this.ticket = res;
      this.emailClient.setValue(this.ticket.emailClient);
      this.files = res.fJoint;
      let data = {
        email: res.emailClient,
        date: res.date,
        option: 'ALL',
      };
      this.mailService.afficherEnvoye(data).subscribe((mails) => {
        this.mails = this.mails.concat(mails);
      });
      this.mailService.afficherListe(data).subscribe((mails) => {
        this.mails = this.mails.concat(mails);
      });
    });

    this.mails = this.mails.sort((a: any, b: any) =>
      a.date > b.date ? 1 : -1
    );
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
      this.attachements.push(element.name);
    }
  }

  rapport(){
    const link = ['agent/tickets/rapport/', this.id];
    this.router.navigate(link);
  }

}
