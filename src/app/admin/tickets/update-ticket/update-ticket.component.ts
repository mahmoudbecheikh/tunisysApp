import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Ticket } from 'src/models/ticket';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Employe } from 'src/models/employe';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css'],
})
export class UpdateTicketComponent implements OnInit {
  ticket?: Ticket;
  id?: number;
  myForm: FormGroup = new FormGroup({});
  departements: Departement[] = [];
  attachmentList: any = [];
  formdata = new FormData();
  attachmentDeleted: any = [];
  minDate = new Date();

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
  employe: FormControl = new FormControl();

  departement: FormControl = new FormControl('', [Validators.required]);
  FjointDeleted: FormControl = new FormControl();
  fJoint: any = [];
  dateLimite: FormControl = new FormControl();
  dateNow: any;
  employeCnt?: Employe;
  constructor(
    private depService: DepartementService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.afficherListe();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.authService.getAuth().subscribe((res) => {
      if (res) this.employeCnt = res;
    });
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      this.sujet.setValue(this.ticket.sujet);
      this.departement.setValue(this.ticket.departement?._id);
      this.description.setValue(this.ticket.description);
      this.emailClient.setValue(this.ticket.emailClient);
      this.nomClient.setValue(this.ticket.nomClient);
      this.telClient.setValue(this.ticket.telClient);
      this.adresse.setValue(this.ticket.adresse);
      this.siteWeb.setValue(this.ticket.siteWeb);
      this.attachmentList = this.ticket.fJoint;
      this.fJoint = this.ticket.fJoint;

      if (this.ticket.dateLimite)
        this.dateLimite.setValue(this.ticket.dateLimite);
    });
    this.dateNow = new Date();
  }

  onSelect(event: any) {
    this.dateLimite.setValue(event);
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
      employe: this.employe,
      dateLimite: this.dateLimite,
    });
  }
  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  modifier() {
    console.log(this.departement.value);
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('departement', this.departement.value);
    this.formdata.append('emailClient', this.emailClient.value);
    this.formdata.append('nomClient', this.nomClient.value);
    this.formdata.append('telClient', this.telClient.value);
    this.formdata.append('description', this.description.value);
    this.formdata.append('siteWeb', this.siteWeb.value);
    this.formdata.append('adresse', this.adresse.value);
    this.formdata.append('dateLimite', this.dateLimite.value);

    for (const file of this.attachmentList) {
      if (!file.url) this.formdata.append('files', file);
    }

    let link = ['admin/tickets'];
    if (this.employeCnt?.role == 1)
      link = ['assistant/tickets/' + this.ticket?._id];

    if (this.employe.value == 'auto') {
      this.employe.setValue(null);

      this.ticketService
        .modifier(this.ticket?._id, this.formdata)
        .subscribe((res) => {
          if (res) {
            this.ticketService.confirmer(res._id).subscribe((response) => {
              this.toastr.success('', 'Ticket modifié avec succès!');
              this.router.navigate(link);
            });
          }
        });
    } else {
      this.ticketService
        .modifier(this.ticket?._id, this.formdata)
        .subscribe((res) => {
          if (res) {
            this.router.navigate(link);
            this.toastr.success('', 'Ticket modifié avec succès!');
          }
        });
    }
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.attachmentList.push(element);
    }
  }

  deleteFile(i: any) {
    if (this.attachmentList[i].url)
      this.formdata.append('FjointDeleted', this.attachmentList[i].filename);

    this.attachmentList.splice(i, 1);
 
  }
}
