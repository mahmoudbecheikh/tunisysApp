import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from 'src/app/services/rapport.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Rapport } from 'src/models/rapport';
import { saveAs } from 'file-saver';
import { Ticket } from 'src/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { Employe } from 'src/models/employe';

@Component({
  selector: 'app-add-rapport',
  templateUrl: './add-rapport.component.html',
  styleUrls: ['./add-rapport.component.css'],
})
export class AddRapportComponent implements OnInit {
  formdata = new FormData();
  attachmentList: any = [];
  attachmentDeleted: any = [];
  files: any = [];
  update = false;
  id?: any;
  rapport?: Rapport;
  employe?  :Employe
  myForm: FormGroup = new FormGroup({});
  recapSujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  collaborateur: FormControl = new FormControl();
  FjointDeleted: FormControl = new FormControl();
  ticket: FormControl = new FormControl();
  ticketSelected? : Ticket ; 
  constructor(
    private rapportService: RapportService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private authService : AuthService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticket.setValue(this.id);
    this.ticketService.afficherId(this.id).subscribe((ticket) => {
      if (ticket.rapport) {
        this.ticketSelected = ticket
        this.rapport = ticket.rapport;
        this.recapSujet.setValue(this.rapport?.recapSujet);
        this.description.setValue(this.rapport?.description);
        this.attachmentList = this.rapport?.fJoint;
      }
    });
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      ticket: this.ticket,
      recapSujet: this.recapSujet,
      description: this.description,
      collaborateur: this.collaborateur,
      FjointDeleted: this.FjointDeleted,
    });
  }

  ajouter() {
    this.rapportService.ajouter(this.myForm.value).subscribe((res) => {
      if (res) {
        this.formdata.append('id', res._id);
        this.rapportService.uploadFiles(this.formdata).subscribe((files) => {
          this.myForm.reset();
          this.formdata = new FormData();
          this.rapport = res ;
          this.recapSujet.setValue(this.rapport?.recapSujet);
          this.description.setValue(this.rapport?.description);
  
        });
      }
    });
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      console.log(element);
      this.formdata.append('files', element);
      this.attachmentList.push(element.name);
    }
  }

  modifier() {
    this.FjointDeleted.setValue(this.attachmentDeleted);

    this.rapportService
      .modifier(this.rapport?._id, this.myForm.value)
      .subscribe((res) => {
        this.rapport = res;
        if (res) {
          this.formdata.append('id', res._id);
          this.rapportService.uploadFiles(this.formdata).subscribe((res) => {
            this.formdata = new FormData();
          });
        }
      });
  }

  delete(index: any) {
    this.attachmentDeleted.push(this.attachmentList[index]);
    this.attachmentList.splice(index, 1);
  }

}
