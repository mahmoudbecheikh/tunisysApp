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

  subject: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  departement: FormControl = new FormControl('', [
    Validators.required
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  clientEmail: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('.*com$'),
  ]);
  clientFullName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  clientTel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);
  manual: FormControl = new FormControl('', [
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
    this.getListDep();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.getById(this.id).subscribe((res) => {
      this.ticket = res;
      this.subject.setValue(this.ticket.subject);
      this.departement.setValue(this.ticket.departement);
      this.description.setValue(this.ticket.description);
      this.clientEmail.setValue(this.ticket.clientEmail);
      this.clientFullName.setValue(this.ticket.clientFullName);
      this.clientTel.setValue(this.ticket.clientTel);
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      subject: this.subject,
      departement : this.departement,
      clientEmail: this.clientEmail,
      clientFullName: this.clientFullName,
      clientTel: this.clientTel,
      description: this.description,
    });
  }

  getListDep() {

    this.depService.listDepartement().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }


  onSubmit() {
    this.ticketService.updateTicket(this.ticket?._id, this.myForm.value).subscribe((res) => {
        console.log(this.myForm.value)
        this.router.navigate(['admin/tickets']);
      });
  }

  returnToList() {
    this.router.navigate(['admin/tickets']);
  }
}
