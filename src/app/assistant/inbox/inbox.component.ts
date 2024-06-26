import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';
import { Departement } from 'src/models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Reponse } from 'src/models/reponse';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  mails: any = [];
  reponses?: Reponse[];
  mailSelected: any;
  departements: Departement[] = [];
  myForm: FormGroup = new FormGroup({});
  formMail: FormGroup = new FormGroup({});
  loading?: any;

  formdata = new FormData();
  ticketFiles: any = [];
  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-zA-ZÀ-ÿ\/\' ]+[a-zA-ZÀ-ÿ]$"),
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

  dateLimite : FormControl = new FormControl('', [Validators.required]);
  dateNow= new Date();
  show = false;

  formdataMail = new FormData();
  textMail: FormControl = new FormControl('', [Validators.required]);
  mailFiles?: any = [];

  formReponse: FormGroup = new FormGroup({});
  titreReponse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  textReponse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);


  constructor(
    private mailService: MailService,
    private depService: DepartementService,
    private ticketService: TicketService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) {
    this.loading = this.spinnerService.loading;

  }

  ngOnInit(): void {
    this.createForm();
    this.afficherDepartements();
    this.afficherListe();
    this.afficherReponse();
  }

  ajouter() {
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('departement', this.departement.value);
    this.formdata.append('emailClient', this.emailClient.value);
    this.formdata.append('nomClient', this.nomClient.value);
    this.formdata.append('telClient', this.telClient.value);
    this.formdata.append('description', this.description.value);
    this.formdata.append('siteWeb', this.siteWeb.value);
    this.formdata.append('adresse', this.adresse.value);
    this.formdata.append('dateLimite', this.dateLimite.value);
    this.formdata.append('statut', 'en attente');
    this.formdata.append('manuel', 'assistant');
    for (const file of this.ticketFiles) {
      this.formdata.append('files', file);
    }
    this.ticketService.ajouter(this.formdata).subscribe((res) => {
      if (res) {
        this.toastr.success('', 'Ticket ajouté avec succès!');
        for (let i = 0; i < this.mails.length; i++) {
          const mail = this.mails[i];
          if(mail.uid==this.mailSelected.uid)
          this.vu(this.mailSelected.uid,i)
          break ;

        }

        this.ticketService.confirmer(res._id).subscribe((response) => {
        });
      }
    });
    this.formdata = new FormData();
    this.myForm.reset();
    this.ticketFiles = [];
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      departement: this.departement,
      emailClient: this.emailClient,
      nomClient: this.nomClient,
      telClient: this.telClient,
      description: this.description,
      siteWeb: this.siteWeb,
      adresse: this.adresse,
      dateLimite: this.dateLimite,
    });
    this.formMail = new FormGroup({
      textMail: this.textMail,
    });
    this.formReponse = new FormGroup({
      titreReponse: this.titreReponse,
      textReponse: this.textReponse,
    });
  }

  afficherDepartements() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res;
    });
  }

  afficherListe() {
    let data = {
      option: 'UNSEEN',
    };
    this.mailService.afficherListe(data).subscribe((res) => {
      if (res.length > 0) {
        this.mails = res.reverse();
      }
    });
  }

  select(mail: any) {
    if(mail){
      this.mailSelected = mail;
      this.show = false;
      this.formMail.reset();
      this.formdata = new FormData();
      this.mailFiles = [];
    }
 
  }

  repondre(el: any) {
    el.scrollIntoView({ behavior: 'smooth' });
    this.show = true;
  }

  uploadFilesMail(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.mailFiles.push(element);
    }
  }
  deleteFileMail(i: any) {
    this.mailFiles.splice(i, 1);
  }

  uploadFiles(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.ticketFiles.push(element);
    }
  }
  deleteFile(i: any) {
    this.ticketFiles.splice(i, 1);
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
      saveAs(blob, mail.filename);
    
  }

  vu(uid: any,index : number) {
    if (this.mailSelected && uid) {
      this.mailService.marquerLue(uid).subscribe((res) => {
        if (res.seen) {
          this.mails.splice(index, 1);

          if (this.mailSelected.uid == uid) this.mailSelected = null;
        }
      });
    }
  }
  supprimer(uid: any,index : number) {
    if (this.mailSelected && uid) {
      this.mailService.supprimer(uid).subscribe((res) => {
        if (res.deleted) {
          this.mails.splice(index, 1);
          if (this.mailSelected.uid == uid) {
            this.mailSelected = null;
          }
        }

      });
    }
  }

  envoyer(mail: any) {
    this.formdataMail.append('sujet', mail.subject);
    this.formdataMail.append('email', mail.from);
    this.formdataMail.append('text', this.textMail.value);
    for (const file of this.mailFiles) {
      this.formdataMail.append('files', file);
    }

    this.mailService.envoyerMail(this.formdataMail).subscribe((res) => {
      if (res.send) {
        this.toastr.success('', 'Email envoyé avec succés');
      } else {
        this.toastr.error('', 'Email envoyé avec succés');
      }
      this.sujet.setValue('');
      this.textMail.setValue('');
      this.formdataMail = new FormData();
      this.mailFiles = [];
    });
  }



  afficherReponse() {
    this.mailService.afficherReponses().subscribe((res) => {
      this.reponses = res;
    });
  }

  ajouterReponse() {
    this.mailService
      .ajouterReponse(this.formReponse.value)
      .subscribe((reponse) => {
        this.formReponse.reset();
        this.afficherReponse();
      });
  }

  supprimerReponse(id: any) {
    this.mailService.supprimerReponse(id).subscribe((res) => {
      this.afficherReponse();
    });
  }

  inserer(text: any) {
    this.textMail.setValue(text);
  }
}
