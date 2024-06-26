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
  id?: string;
  departementSelected?: Departement;
  departements: Departement[] = [];
  attachmentList: any = [];
  attachmentDeleted: any = [];

  minDate = new Date();

  formdata = new FormData();
  myForm: FormGroup = new FormGroup({});
  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-zA-ZÀ-ÿ/' ]+[a-zA-ZÀ-ÿ]$"),
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
  dateLimite: FormControl = new FormControl('', [Validators.required]);

  FjointDeleted: FormControl = new FormControl();

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
    this.id = this.activatedRoute.snapshot.params['id'];
    this.createForm();
    this.afficherTicket();
    this.afficherListe();
    this.authService.getAuth().subscribe((res) => {
      if (res) this.employeCnt = res;
    });
  }

  onSelect(event: any) {
    if (event) this.dateLimite.setValue(event);
  }

  afficherTicket() {
    this.ticketService.afficherId(this.id).subscribe((res) => {
      if (res) {
        this.ticket = res;
        this.sujet.setValue(this.ticket.sujet);
        this.departement.setValue(this.ticket.departement?._id);
        if (this.ticket.employe)
          this.employe.setValue(this.ticket.employe?._id);
        this.description.setValue(this.ticket.description);
        this.emailClient.setValue(this.ticket.emailClient);
        this.nomClient.setValue(this.ticket.nomClient);
        this.telClient.setValue(this.ticket.telClient);
        this.adresse.setValue(this.ticket.adresse);
        this.siteWeb.setValue(this.ticket.siteWeb);
        this.attachmentList = this.ticket.fJoint;
        if (this.ticket.dateLimite)
          this.dateLimite.setValue(this.ticket.dateLimite);
        this.afficherDepartement();
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
      siteWeb: this.siteWeb,
      adresse: this.adresse,
      employe: this.employe,
      dateLimite: this.dateLimite,
    });
  }

  afficherDepartement() {
    this.depService
      .afficherId(this.ticket?.departement?._id)
      .subscribe((res) => {
        this.departementSelected = res;
      });
  }

  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res;
    });
  }

  getListDep() {
    this.depService.afficherListe().subscribe((res) => {
      if (Array.isArray(res)) this.departements = res;
      else this.departements = [];
    });
  }

  modifier() {
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('departement', this.departement.value);
    this.formdata.append('emailClient', this.emailClient.value);
    this.formdata.append('nomClient', this.nomClient.value);
    this.formdata.append('telClient', this.telClient.value);
    this.formdata.append('description', this.description.value);
    this.formdata.append('siteWeb', this.siteWeb.value);
    this.formdata.append('adresse', this.adresse.value);
    this.formdata.append('dateLimite', this.dateLimite.value);
    if (this.employe.value != 'auto') {
      this.formdata.append('employe', this.employe.value);
    }

    for (const file of this.attachmentList) {
      if (!file.url) this.formdata.append('files', file);
    }

    let link = ['admin/tickets'];
    if (this.employeCnt?.role == 1)
      link = ['assistant/tickets/' + this.ticket?._id];

    if (this.employe.value == 'auto') {
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
      this.formdata = new FormData();
    } else {
      this.ticketService
        .modifier(this.ticket?._id, this.formdata)
        .subscribe((res) => {
          if (res) {
            this.router.navigate(link);
            this.toastr.success('', 'Ticket modifié avec succès!');
          }
        });
      this.formdata = new FormData();
    }
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.attachmentList.push(element);
    }
  }

  deleteFile(i: number) {
    if (this.attachmentList[i].url)
      this.formdata.append('FjointDeleted', this.attachmentList[i].filename);

    this.attachmentList.splice(i, 1);
  }
}
