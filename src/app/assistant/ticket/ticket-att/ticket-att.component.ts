import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { Router } from '@angular/router';
import { Departement } from 'src/models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-ticket-att',
  templateUrl: './ticket-att.component.html',
  styleUrls: ['./ticket-att.component.css'],
})
export class TicketAttComponent implements OnInit {
  tickets: Ticket[] = [];
  departements: Departement[] = [];
  myForm: FormGroup = new FormGroup({});
  attachmentList: any = [];
  files: any = [];
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
    Validators.pattern('(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
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

  formdata = new FormData();
  constructor(
    private ticketService: TicketService,
    private router: Router,
    private depService: DepartementService
  ) {}

  ngOnInit(): void {
    this.afficherListe();
    this.createForm();
    this.afficherDepartements();
    this.dateNow = new Date();
  }

  afficherListe() {
    this.ticketService.afficherListe().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        const ticket = res[i];
        if (ticket.statut == 'en attente') this.tickets.push(ticket);
      }
    });
  }

  ajouter() {
    this.ticketService.ajouter(this.myForm.value).subscribe((res) => {
      if (res) {
        this.formdata.append('id', res._id);
        this.ticketService.confirmer(res._id).subscribe((response) => {
          this.ticketService.uploadFiles(this.formdata).subscribe((files) => {
            console.log(files);
          });
          this.formdata.delete('files');
          this.myForm.reset();
          this.statut.setValue('en attente');
          this.manuel.setValue('assistant');
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
  }

  confirmer(id: any) {
    this.ticketService.confirmer(id).subscribe((res) => {
      this.afficherListe();
    });
  }

  consulter(id: any) {
    const link = ['assistant/tickets', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {}

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.files.push(element.name);
    }
  }
}
