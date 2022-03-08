import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Departement } from 'src/models/departement';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent implements OnInit {
  departements: Departement[] = [];

  myForm: FormGroup = new FormGroup({});
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
    Validators.pattern(".*com$")
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

  constructor(private ticketService : TicketService ,private depService : DepartementService, private router : Router) {}

  ngOnInit(): void {
    this.createForm();
    this.getListDep();
  }


  createForm() {
    this.myForm = new FormGroup({
      subject: this.subject,
      departement: this.departement,
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

  returnToList() {
    this.router.navigate(['admin/tickets']);
  }
  onSubmit() {
    this.ticketService.addTicket(this.myForm.value).subscribe((res) => {
      this.router.navigate(['admin/tickets']);
    });
  }
}
