import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Ticket } from 'src/models/ticket';
import { HttpClient } from '@angular/common/http';

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
  manuel: FormControl = new FormControl('admin');
  statut: FormControl = new FormControl('en attente');
  employe: FormControl = new FormControl();

  departement: FormControl = new FormControl('', [Validators.required]);
  FjointDeleted: FormControl = new FormControl();
  dateLimite : FormControl = new FormControl();
  dateNow: any;

  constructor(
    private depService: DepartementService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.afficherListe();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
      this.ticket = res;
      this.sujet.setValue(this.ticket.sujet);
      this.departement.setValue(this.ticket.departement);
      this.description.setValue(this.ticket.description);
      this.emailClient.setValue(this.ticket.emailClient);
      this.nomClient.setValue(this.ticket.nomClient);
      this.telClient.setValue(this.ticket.telClient);
      this.adresse.setValue(this.ticket.adresse);
      this.siteWeb.setValue(this.ticket.siteWeb);
      this.statut.setValue(this.ticket.statut);
      this.attachmentList = this.ticket.fJoint;
    });
    this.dateNow = new Date();

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
      siteWeb: this.siteWeb,
      adresse: this.adresse,
      statut: this.statut,
      FjointDeleted: this.FjointDeleted,
      employe: this.employe,
      dateLimite : this.dateLimite

    });
  }
  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  modifier() {
    this.FjointDeleted.setValue(this.attachmentDeleted);
    if (this.employe.value == 'auto') {
      this.employe.setValue(null);
      this.ticketService
        .modifier(this.ticket?._id, this.myForm.value)
        .subscribe((res) => {
          if (res) {
            this.ticketService.confirmer(res._id).subscribe((response) => {
              this.formdata.append('id', res._id);

              this.ticketService
                .uploadFiles(this.formdata)
                .subscribe((files) => {
                  console.log(files);
                });

              this.router.navigate(['admin/tickets']);
            });
          }
        });
    } else {
      this.ticketService
        .modifier(this.ticket?._id, this.myForm.value)
        .subscribe((res) => {
          if (res) {
            this.ticketService.uploadFiles(this.formdata).subscribe((files) => {
              console.log(files);
            });

            this.router.navigate(['admin/tickets']);
          }
        });
    }
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.attachmentList.push(element.name);
    }
  }

  delete(index: any) {
    this.attachmentDeleted.push(this.attachmentList[index]);
    this.attachmentList.splice(index, 1);
  }
}
