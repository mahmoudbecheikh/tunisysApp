import { Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-detail-ticket-att',
  templateUrl: './detail-ticket-att.component.html',
  styleUrls: ['./detail-ticket-att.component.css'],
})
export class DetailTicketAttComponent implements OnInit {
  employe?: Employe;
  ticket?: Ticket;
  collaborateurs: any;
  id: any;
  files:any = [];
  attachements?: any = [];
  localUrl?: any;
  formdata = new FormData();
  mails: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  notifEnv: any;
  tagsCtrl = new FormControl();
  filtredTags?: string[];
  tags: any = [];

  allTags: string[] = [];
  suggestions: any;
  reponses: any;
  formReponse: FormGroup = new FormGroup({});
  formTag: FormGroup = new FormGroup({});
  myForm: FormGroup = new FormGroup({});

  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  text: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);

  raison: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  titreReponse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  textReponse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  file: FormControl = new FormControl('');
  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;
  employes: any;
  employeCtrl: FormControl = new FormControl();
  admin? : Employe
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private mailService: MailService,
    private router: Router,
    private authService: AuthService,
    private depService: DepartementService,
    private notifService: NotificationService,
    private empService  : EmployeeService ,
    private socketService: SocketService
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

    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
    });

    this.empService.afficherListe().subscribe(res=>{
      for (const employe of res) {
        if(employe.role==0)
        this.admin = employe
        break
      }
    })

    this.socketService.listen('confirmNotif').subscribe((res) => {
      if (res) {
        this.afficherNotifEnv();
        this.ticketService.afficherId(this.id).subscribe((res) => {
          this.collaborateurs = res.collaborateurs;
        });
      }
    });

    this.socketService.listen('delNotif').subscribe((res) => {
      if (res) {
        this.afficherNotifEnv();
        this.ticketService.afficherId(this.id).subscribe((res) => {
          this.collaborateurs = res.collaborateurs;
        });
      }
    });

    this.ticketService.afficherId(this.id).subscribe((res) => {
      if (res) {
        this.afficherMails(res?.emailClient, res.date);
        this.afficherTags();

        this.ticket = res;
        this.collaborateurs = res.collaborateurs;
        this.afficherEmploye();
        this.afficherSuggestion();
        this.tags = res.tags;
        this.emailClient.setValue(this.ticket.emailClient);
        this.files = res.fJoint;
      }
    });

    this.tagsCtrl.valueChanges.subscribe((res) => {
      // if (res == '') this.filtredTags = [];
      // else {
      //   this.filterData(res);
      // }
              this.filterData(res);

    });
  }

  afficherMails(emailClient: any, date: any) {
    let data = {
      email: emailClient,
      date: date,
      option: 'ALL',
    };
    this.mailService.afficherDiscussion(data).subscribe((mails) => {
      if (mails) {
        this.mails = mails;
        this.mails = this.mails.sort((a: any, b: any) =>
          a.date > b.date ? 1 : -1
        );
      }
    });
  }

  afficherEmploye() {
    this.depService
      .afficherId(this.ticket?.departement?._id)
      .subscribe((dep) => {
        this.employes = dep.employes;

        this.afficherNotifEnv();
      });
  }

  afficherNotifEnv() {
    if(this.employe?._id)
    this.notifService.afficherEnv(this.employe?._id).subscribe((res) => {
      this.notifEnv = res;
    });
  }

  afficherSuggestion() {
    this.ticketService.suggestion(this.ticket?._id).subscribe((res) => {
      this.suggestions = res;
    });
  }


  
  confirmer() {
    this.ticketService.confirmer(this.ticket?._id).subscribe((res) => {
      this.router.navigate(['assistant/tickets'])
    });
  }


  afficherTags() {
    this.ticketService.afficherListe().subscribe((tickets) => {
      for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        console.log(ticket.tags)

        if (ticket.departement.nom == this.ticket?.departement?.nom) {

          this.allTags = this.allTags.concat(ticket.tags);
        }
      }
      this.allTags = [...new Set(this.allTags)];
      console.log(this.allTags)
    });
  }

  filterData(enteredData: any) {
    if (enteredData) {
      this.filtredTags = this.allTags?.filter((item) => {
        return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
      });
    }
  }

  download(fileName: string) {
    this.ticketService.downloadFile(fileName).subscribe((res) => {
      console.log(res)
      saveAs(res, fileName);
    });
  }

  envoyer() {
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('email', this.emailClient.value);
    this.formdata.append('text', this.text.value);
    this.mailService.envoyerMail(this.formdata).subscribe((res) => {
      this.sujet.setValue('')
      this.text.setValue('')
      this.formdata = new FormData();
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.attachements.push(element.name);
    }
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

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  toUpdate(){
    let link = ['admin/tickets/update/', this.id];
    switch (this.employe?.role) {
      case 0:
        this.router.navigate(link);
        break;
      case 1:
        link = ['assistant/tickets/update/', this.id];
        this.router.navigate(link);
        break;
     
    }
  }

  resetForm(){
    this.sujet.setValue('')
    this.text.setValue('')
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
        this.afficherTags()
      });
  }

  envoyerNotif(employe: any) {
    let data = {
      envoyeur: this.employe,
      recepteur: employe,
      contenu: 'invitation',
      ticket: this.ticket,
    };
    this.notifService.envoyer(data).subscribe((res) => {
      this.afficherEmploye();
      this.afficherNotifEnv();
    });
    // this.socketService.emit('envoyerNotif',data)
  }

  verify(id: any) {
    if (this.notifEnv)
      for (const notif of this.notifEnv) {
        if (notif.recepteur._id == id && this.ticket?._id == notif.ticket._id)
          return true;
      }
    return false;
  }
  supprimer(id: any) {
    let notif = this.notifEnv.filter(function (el: any) {
      return el.recepteur._id == id;
    });

    this.notifService.supprimer(notif[0]._id).subscribe((res) => {
      if (res) {
        this.afficherEmploye();
      }
    });
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
      idTicket: this.ticket?._id
    };
    let notification = {
      envoyeur: this.employe,
      recepteur: this.admin?._id,
      contenu: 'reclamation',
      ticket: this.ticket,
    };
    this.ticketService.reclamer(reclamation).subscribe((res) => {
      if(res){
        
        this.notifService.envoyer(notification).subscribe((res) => {
          this.raison.setValue('');

        });
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
      this.reponses = res;
    });
  }

  ajouterReponse() {
    this.mailService
      .ajouterReponse(this.formReponse.value)
      .subscribe((reponse) => {
        this.formReponse.reset();
        this.afficherReponse();
      });
  }

  supprimerReponse(id: any) {
    this.mailService.supprimerReponse(id).subscribe((res) => {
      this.afficherReponse();
    });
  }

  inserer(text: any) {
    this.text.setValue(text);
  }
}
