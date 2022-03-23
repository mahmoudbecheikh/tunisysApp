import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';
import { Ticket } from 'src/models/ticket';

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

  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  departement: FormControl = new FormControl('', [Validators.required]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('.*com$'),
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  tel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);
  manuel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  fJoint: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  siteWeb: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  statut: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  tags: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
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
      this.tel.setValue(this.ticket.tel);
      this.fJoint.setValue(this.ticket.fJoint);
      this.adresse.setValue(this.ticket.adresse);
      this.siteWeb.setValue(this.ticket.siteWeb);
      this.statut.setValue(this.ticket.statut);
      this.tags.setValue(this.ticket.tags);
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      departement: this.departement,
      emailClient: this.emailClient,
      nomClient: this.nomClient,
      tel: this.tel,
      description: this.description,
    });
  }

  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  modifier() {
    this.ticketService.modifier(this.ticket?._id, this.myForm.value).subscribe((res) => {
        console.log(this.myForm.value);
        this.router.navigate(['admin/tickets']);
      });
  }
}
