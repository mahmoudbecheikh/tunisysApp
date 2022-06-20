import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { AuthService } from 'src/app/services/auth.service';
import { Employe } from 'src/models/employe';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { DepartementService } from 'src/app/services/departement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/models/reclamation';
import { Reponse } from 'src/models/reponse';
@Component({
  selector: 'app-detail-ticket-att',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css'],
})
export class DetailTicketComponent implements OnInit {
  employe?: Employe;
  ticket?: Ticket;
  collaborateurs?: Employe[];
  suggestions?: Ticket[];
  reponses?: Reponse[];
  files: any = [];
  attachements?: any = [];
  id?: string;
  mails: any = [];
  notifEnv: any;
  reclamation?: Reclamation;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filtredTags?: string[];
  tags: any = [];
  allTags: string[] = [];
  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;
  formTag: FormGroup = new FormGroup({});
  tagsCtrl = new FormControl();

  raison: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  formdata = new FormData();
  myForm: FormGroup = new FormGroup({});
  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  sujet: FormControl = new FormControl('', [
    Validators.pattern("^[a-zA-ZÀ-ÿ\/\' ]+[a-zA-ZÀ-ÿ]$"),
  ]);
  text: FormControl = new FormControl('', [Validators.required]);

  formReponse: FormGroup = new FormGroup({});
  titreReponse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  textReponse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  file: FormControl = new FormControl('');
  employes: any;
  employeCtrl: FormControl = new FormControl();
  admins?: Employe[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private mailService: MailService,
    private router: Router,
    private authService: AuthService,
    private depService: DepartementService,
    private notifService: NotificationService,
    private empService: EmployeeService,
    private socketService: SocketService,
    private toastr: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      email: this.emailClient,
      text: this.text,
    });
    this.formReponse = new FormGroup({
      titreReponse: this.titreReponse,
      textReponse: this.textReponse,
    });
    this.formTag = new FormGroup({
      tags: this.tagsCtrl,
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.createForm();
    this.afficherReponse();
    this.empService.afficherListe().subscribe((res) => {
      if (res) {
        let admins = [];
        for (const employe of res) {
          if (employe.role == 0) admins.push(employe);
        }
        this.admins = admins;
      }
    });
    this.socketService.listen('confirmNotif').subscribe((res) => {
      if (res) {
        this.afficherNotifEnv();
        this.ticketService.afficherId(this.id).subscribe((res) => {
          if (res) this.collaborateurs = res.collaborateurs;
        });
      }
    });

    this.socketService.listen('delNotif').subscribe((res) => {
      if (res) {
        this.afficherNotifEnv();
        this.ticketService.afficherId(this.id).subscribe((res) => {
          if (res) this.collaborateurs = res.collaborateurs;
        });
      }
    });

    this.afficherTicket();

    this.tagsCtrl.valueChanges.subscribe((res) => {
      if (res == '') this.filtredTags = [];
      else {
        this.filterData(res);
      }
    });
  }

  afficherTicket() {
    this.ticketService.afficherId(this.id).subscribe((res) => {
      if (res) {
        this.ticket = res;
        this.collaborateurs = res.collaborateurs;
        this.tags = res.tags;
        this.emailClient.setValue(this.ticket.emailClient);
        this.files = res.fJoint;
        this.afficherMails(res?.emailClient, res.date);
        this.afficherSuggestion();
        this.afficherReclamation();
        this.afficherTags();
        this.afficherEmploye();
        this.employeCnt();
      }
    });
  }

  afficherMails(emailClient: any, date: any) {
    let data = {
      email: emailClient,
      date: date,
      option: 'ALL',
    };
    this.mailService.afficherDiscussion(data).subscribe((mails) => {
      if (mails) this.mails = mails;
    });
  }

  employeCnt() {
    this.authService.getAuth().subscribe((res) => {
      if (res) {
        this.employe = res;
        this.afficherNotifEnv();
      }
    });
  }

  afficherReclamation() {
    this.ticketService.afficherReclamationsTicket(this.id).subscribe((res) => {
      if (res) {
        this.reclamation = res;
        this.raison.setValue(this.reclamation?.raison);
      }
    });
  }

  afficherEmploye() {
    this.depService
      .afficherId(this.ticket?.departement?._id)
      .subscribe((dep) => {
        if (dep) {
          this.employes = dep.employes;
          this.afficherNotifEnv();
        }
      });
  }

  afficherNotifEnv() {
    if (this.employe?._id)
      this.notifService.afficherEnv(this.employe?._id).subscribe((res) => {
        if (res) this.notifEnv = res;
      });
  }

  afficherSuggestion() {
    this.ticketService.suggestion(this.ticket?._id).subscribe((res) => {
      if (res) this.suggestions = res;
    });
  }

  confirmer() {
    this.ticketService.confirmer(this.ticket?._id).subscribe((res) => {
      if (res) {
        this.toastr.success('', 'Ticket confirmé avec succès!');
        this.router.navigate(['assistant/tickets']);
      }
    });
  }

  afficherTags() {
    this.ticketService.afficherListe().subscribe((tickets) => {
      for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        if (ticket.departement.nom == this.ticket?.departement?.nom) {
          this.allTags = this.allTags.concat(ticket.tags);
        }
      }
      this.allTags = [...new Set(this.allTags)];
    });
  }

  filterData(enteredData: string) {
    if (enteredData) {
      this.filtredTags = this.allTags?.filter((item) => {
        return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
      });
    }
  }

  download(fileName: string) {
    if (fileName)
      this.ticketService.downloadFile(fileName).subscribe((res) => {
        saveAs(res, fileName);
      });
  }

  envoyer() {
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('email', this.emailClient.value);
    this.formdata.append('text', this.text.value);
    for (const file of this.attachements) {
      this.formdata.append('files', file);
    }
    this.mailService.envoyerMail(this.formdata).subscribe((res) => {
      this.sujet.setValue('');
      this.text.setValue('');
      this.attachements = [];
    });
    this.formdata = new FormData();
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.attachements.push(element);
    }
  }

  deleteFile(i: number) {
    this.attachements.splice(i, 1);
  }

  rapport() {
    let link = ['admin/tickets/rapport/', this.id];
    switch (this.employe?.role) {
      case 0:
        this.router.navigate(link);
        break;
      case 1:
        link = ['assistant/tickets/rapport/', this.id];
        this.router.navigate(link);
        break;
      case 2:
        link = ['agent/tickets/rapport/', this.id];
        this.router.navigate(link);
        break;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  resetForm() {
    this.sujet.setValue('');
    this.text.setValue('');
  }

  selected(event: any): void {
    this.tags.push(event);
    if (this.tagInput) this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
    this.filtredTags = [];
  }

  enregistrer() {
    this.tagsCtrl.setValue(this.tags);
    this.ticketService
      .modifierTags(this.id, this.formTag.value)
      .subscribe((res) => {
        this.tagsCtrl.setValue('');
        this.afficherTags();
      });
  }

  envoyerInvitation(employe: Employe) {
    let data = {
      envoyeur: this.employe,
      recepteur: employe,
      contenu: 'invitation',
      ticket: this.ticket,
    };
    this.notifService.envoyer(data).subscribe((res) => {
      if (res) {
        this.afficherEmploye();
        this.afficherNotifEnv();
      }
    });
  }

  verify(id: any) {
    if (this.notifEnv) {
      for (const notif of this.notifEnv) {
        if (notif?.recepteur?._id == id && this.ticket?._id == notif?.ticket?._id)
          return true;
      }
    }
    return false;
  }

  supprimer(id: string) {
    let ticketId = this.ticket?._id;
    let notif = this.notifEnv.filter(function (el: any) {
      return el?.recepteur?._id == id && el?.ticket?._id == ticketId;
    });

    if (notif[0]) {
      this.notifService.supprimer(notif[0]?._id).subscribe((res) => {
        if (res) {
          this.afficherEmploye();
        }
      });
    }
  }

  quitter() {
    this.ticketService
      .quitter(this.ticket?._id, this.employe?._id)
      .subscribe((res) => {
        this.router.navigate(['agent/']);
      });
  }

  reclamer() {
    let reclamation = {
      raison: this.raison.value,
      idEmp: this.employe?._id,
      idTicket: this.ticket?._id,
    };

    this.ticketService.reclamer(reclamation).subscribe((res) => {
      if (res) {
        if (this.admins)
          for (const admin of this.admins) {
            let notification = {
              envoyeur: this.employe,
              recepteur: admin?._id,
              contenu: 'reclamation',
              ticket: this.ticket,
            };
            this.notifService.envoyer(notification).subscribe((res) => {});
          }
        this.afficherReclamation();
        this.raison.setValue('');
      }
    });
  }

  verifyCollab(id: any) {
    if (this.collaborateurs)
      for (let index = 0; index < this.collaborateurs?.length; index++) {
        const employe = this.collaborateurs[index];
        if (employe._id == id) return true;
      }
    return false;
  }

  afficherReponse() {
    this.mailService.afficherReponses().subscribe((res) => {
      if(Array.isArray(res))
      this.reponses = res;
    });
  }

  ajouterReponse() {
    this.mailService
      .ajouterReponse(this.formReponse.value)
      .subscribe((reponse) => {
        if(reponse)
        this.afficherReponse();
        this.formReponse.reset();

      });
  }

  supprimerReponse(id: any) {
    this.mailService.supprimerReponse(id).subscribe((res) => {
      if(res)
      this.afficherReponse();
    });
  }

  inserer(text: any) {
    this.text.setValue(text);
  }
}
