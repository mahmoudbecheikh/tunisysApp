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
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);
  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  siteWeb: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(
      '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
    ),
  ]);
  telClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);
  manuel: FormControl = new FormControl('admin');
  statut: FormControl = new FormControl('en attente');
  departement: FormControl = new FormControl('', [Validators.required]);
  FjointDeleted: FormControl = new FormControl();
  constructor(
    private depService: DepartementService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
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
    });
  }
  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  modifier() {
    this.FjointDeleted.setValue(this.attachmentDeleted);
    this.ticketService
      .modifier(this.ticket?._id, this.myForm.value)
      .subscribe((res) => {
        if (res) {
          this.ticketService.confirmer(res._id).subscribe((response) => {
            this.formdata.append('id', res._id);
            this.httpClient
              .post('http://localhost:3000/multiplefiles', this.formdata)
              .subscribe((d) => {
                console.log(d);
              });
            this.router.navigate(['admin/tickets']);
          });
        }
      });
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
