import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  attachmentList:any = [];

  formdata = new FormData();

  myForm: FormGroup = new FormGroup({});
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
  departement: FormControl = new FormControl('', [Validators.required]);
  dateLimite : FormControl = new FormControl();

  selectedDate: any;
  minDate = new Date()

  onSelect(event:any){
    this.selectedDate= event;
    this.dateLimite.setValue(event)
  }


  constructor(
    private ticketService: TicketService,
    private depService: DepartementService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.createForm();
    this.afficherListe();

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
      dateLimite : this.dateLimite
    });
  }

  afficherListe() {
    this.depService.afficherListe().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  returnToList() {
    this.router.navigate(['admin/tickets']);
  }
  ajouter() {
    this.ticketService.ajouter(this.myForm.value).subscribe((res) => {
      if (res) {
        console.log(res)
        this.ticketService.confirmer(res._id).subscribe(response=>{
          this.formdata.append('id', res._id);
          this.ticketService.uploadFiles(this.formdata).subscribe((files) => {
            console.log(files);
          });
          this.router.navigate(['admin/tickets']);
        })
      
      }
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.attachmentList.push(element.name)
    }
  }
}
