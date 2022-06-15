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
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {

  attachmentList: any = [];
  attachmentDeleted: any = [];
  id?: string;
  rapport?: Rapport;
  employe?: Employe;
  ticketSelected?: Ticket;

  formdata = new FormData();
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
  FjointDeleted: FormControl = new FormControl();
  ticket: FormControl = new FormControl();

  constructor(
    private rapportService: RapportService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.createForm();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticket.setValue(this.id);
    this.formdata.append('ticket', this.ticket.value);
    this.ticketService.afficherId(this.id).subscribe((ticket) => {
      if (ticket.rapport) {
        this.ticketSelected = ticket;
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
      FjointDeleted: this.FjointDeleted,
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.attachmentList.push(element);
    }
  }

  ajouter() {
    this.formdata.append('recapSujet', this.recapSujet.value);
    this.formdata.append('description', this.description.value);
    for (const file of this.attachmentList) {
      if (!file.url) this.formdata.append('files', file);
    }
    this.rapportService.ajouter(this.formdata).subscribe((res) => {
      if (res) {
        this.myForm.reset();
        this.formdata = new FormData();
        this.rapport = res;
        this.toastr.success('', 'Rapport ajouté avec succès!');
        this.recapSujet.setValue(this.rapport?.recapSujet);
        this.description.setValue(this.rapport?.description);
      }
    });
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
    });
  }

  modifier() {
    this.FjointDeleted.setValue(this.attachmentDeleted);
    this.formdata.append('recapSujet', this.recapSujet.value);
    this.formdata.append('description', this.description.value);
    for (const file of this.attachmentList) {
      if (!file.url) this.formdata.append('files', file);
    }
    this.rapportService.modifier(this.rapport?._id, this.formdata).subscribe((res) => {
        if (res) {
          this.myForm.reset();
          this.formdata = new FormData();
          this.rapport = res;
          this.toastr.success('', 'Rapport modifié avec succès!');

          this.recapSujet.setValue(this.rapport?.recapSujet);
          this.description.setValue(this.rapport?.description);
        }
      });
  }

  deleteFile(i: number) {
    if (this.attachmentList[i].url)
      this.formdata.append('FjointDeleted', this.attachmentList[i].filename);
    this.attachmentList.splice(i, 1);
  }
}
