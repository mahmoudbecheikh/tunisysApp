import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  selectedDate: any;
  minDate = new Date()
  
  formdata = new FormData();
  myForm: FormGroup = new FormGroup({});
  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("^[a-zA-ZÀ-ÿ\/\' ]+[a-zA-ZÀ-ÿ]$"),
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
  departement: FormControl = new FormControl('', [Validators.required]);
  dateLimite : FormControl = new FormControl('', [Validators.required]);

  constructor(
    private ticketService: TicketService,
    private depService: DepartementService,
    private router: Router,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.createForm();
    this.afficherListe();
  }

  onSelect(event:any){
    this.selectedDate= event;
    this.dateLimite.setValue(event)
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
      dateLimite : this.dateLimite
    });
  }

  afficherListe() {
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
    this.formdata.append('manuel', 'admin');

    for (const file of this.attachmentList) {
      this.formdata.append('files', file);

    }

    this.ticketService.ajouter(this.formdata).subscribe((res) => {
      if (res._id) {
        this.ticketService.confirmer(res._id).subscribe(response=>{
          this.toastr.success('', 'Ticket ajouté avec succès!');
          this.router.navigate(['admin/tickets']);
        })
      }
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.attachmentList.push(element)
    }
  }

  deleteFile(i: any) {
    this.attachmentList.splice(i, 1);
  }

}
