import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';
import { Departement } from 'src/models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  mails: any = [];
  mailSelected: any;
  departements: Departement[] = [];
  myForm: FormGroup = new FormGroup({});
  attachmentList: any = [];
  files: any = [];
  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  siteWeb: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
  ]);
  telClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);
  departement: FormControl = new FormControl('', Validators.required);

  manuel: FormControl = new FormControl('assistant');
  statut: FormControl = new FormControl('en attente');
  loading$ = this.spinnerService.loading$;
  dateLimite: FormControl = new FormControl();

  dateNow: any;

  formdata = new FormData();

  constructor(
    private mailService: MailService,
    private depService: DepartementService,
    private ticketService: TicketService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.afficherDepartements();
    this.afficherListe();
    this.dateNow = new Date();
  }

  ajouter() {
    this.ticketService.ajouter(this.myForm.value).subscribe((res) => {
      if (res) {
        this.vu(this.mailSelected.uid);
        this.formdata.append('id', res._id);
        this.ticketService.confirmer(res._id).subscribe((response) => {
          this.ticketService.uploadFiles(this.formdata).subscribe((files) => {
            console.log(files);
          });
          this.formdata.delete('files');
          this.myForm.reset();
          this.files = [];
        });
      }
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      departement: this.departement,
      emailClient: this.emailClient,
      nomClient: this.nomClient,
      telClient: this.telClient,
      description: this.description,
      manuel: this.manuel,
      statut: this.statut,
      siteWeb: this.siteWeb,
      adresse: this.adresse,
      dateLimite: this.dateLimite,
    });
  }

  afficherDepartements() {
    this.depService.afficherListe().subscribe((res) => {
      console.log(res);
      this.departements = res;
    });
  }

  afficherListe() {
    let data = {
      option: 'UNSEEN',
    };
    this.mailService.afficherListe(data).subscribe((res) => {
      console.log(res);
      if (res.length > 0) {
        console.log(res);
        // let inboxSorted = res.sort((a: any, b: any) =>
        //   a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        // );
        this.mails = res.reverse();
      }
    });
  }

  select(mail: any) {
    console.log(mail);
    this.mailSelected = mail;
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.files.push(element.name);
    }
  }

  download(mail: any) {
    let buff = Buffer.from(mail.content).toString('base64');
    let encoded: string = atob(buff);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(encoded.length);
    const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < encoded.length; i++) {
      int8Array[i] = encoded.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: mail.contentType });
    console.log(blob);
    saveAs(blob, mail.filename);
  }

  vu(uid: any) {
    let data = {
      email: 'tunisys.mb.sj@gmail.com',
      uid: uid,
    };
    this.mailService.modifier(data).subscribe((res) => {
      this.afficherListe();
    });
  }
  supprimer(uid: any) {
    this.mailService
      .supprimer('tunisys.mb.sj@gmail.com', uid)
      .subscribe((res) => {
        this.afficherListe();
      });
  }
}
