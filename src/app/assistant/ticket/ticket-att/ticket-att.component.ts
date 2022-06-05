import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { Router } from '@angular/router';
import { Departement } from 'src/models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket-att',
  templateUrl: './ticket-att.component.html',
  styleUrls: ['./ticket-att.component.css'],
})
export class TicketAttComponent implements OnInit {
  tickets: Ticket[] = [];
  departements: Departement[] = [];
  myForm: FormGroup = new FormGroup({});
  ticketFiles: any = [];
  dateLimite: FormControl = new FormControl();
  dateNow: any;

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

  formdata = new FormData();
  constructor(
    private ticketService: TicketService,
    private router: Router,
    private depService: DepartementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.afficherListe();
    this.createForm();
    this.afficherDepartements();
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
      siteWeb: this.siteWeb,
      adresse: this.adresse,
      dateLimite: this.dateLimite,
    });
  }

  afficherListe() {
    this.ticketService.afficherAttente().subscribe((res) => {
      this.tickets = res;
    });
  }

  afficherDepartements() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res;
    });
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
        this.ticketService.confirmer(res._id).subscribe((response) => {
          this.toastr.success('', 'Ticket ajouté avec succès!');
        });
      }
    });
    this.formdata = new FormData();
    this.myForm.reset();
    this.ticketFiles = [];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
  }

  consulter(id: any) {
    const link = ['assistant/tickets', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {
    this.ticketService.supprimer(id).subscribe((res) => {
      this.afficherListe();
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.ticketFiles.push(element);
    }
  }
  
  deleteFile(i: any) {
    this.ticketFiles.splice(i, 1);
  }
}
