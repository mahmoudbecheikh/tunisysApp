import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications: any;
  messages: any;
  nonLueMsg: number = 0;
  nonLueNotif: number = 0;

  employe?: Employe;
  employes?: any[] = [];
  employeFilter?: any[] = [];
  results?: any[] = [];
  show: boolean = false;
  colors: string[] = [];

  formRech: FormGroup = new FormGroup({});
  nom: FormControl = new FormControl('', []);
  @Output() selectEmployeEvent = new EventEmitter<any>();
  sound = new Audio('../../assets/sounds/notification.mp3');

  constructor(
    private authService: AuthService,
    private notifService: NotificationService,
    private socketService: SocketService,
    private employeService: EmployeeService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
      this.socketService.emit('joinRoom', { id: res?._id });
      this.afficherNotif();
      this.afficherMsg();
    });
    this.formRech = new FormGroup({
      nom: this.nom,
    });

    this.socketService.listen('newMsg').subscribe((msg) => {
      if (msg) {
        this.afficherMsg();
        this.sound.play();
      }
    });

    this.socketService.listen('updateMsg').subscribe((res) => {
      if (res) {
        this.afficherMsg();
      }
    });
    this.employeService.afficherListe().subscribe((res) => {
      if (res) {
        for (const employe of res) {
          let nom = employe.nomEmp + ' ' + employe.prenomEmp;
          this.employes?.push({
            _id: employe._id,
            nom: nom,
            nomEmp: employe.nomEmp,
            prenomEmp: employe.prenomEmp,
          });
        }
      }
    });
    this.nom.valueChanges.subscribe((response) => {
      if (response && response.trim() == '') this.employeFilter = [];
      else {
        this.filterData(response);
        this.employeFilter = [...new Set(this.employeFilter)];
      }
    });

    this.socketService.listen('delNotif').subscribe((res) => {
      if (res) {
        this.afficherNotif();
      }
    });

    this.socketService.listen('confirmNotif').subscribe((res) => {
      if (res) {
        this.afficherNotif();
      }
    });

    this.socketService.listen('newNotif').subscribe((res) => {
      this.afficherNotif();
      this.sound.play();
    });
  }

  afficherMsg() {
    this.nonLueMsg = 0;
    this.chatService.afficherNonLue(this.employe?._id).subscribe((res) => {
      if (res) {
        this.rand(res);
        this.messages = res;
        for (const msg of this.messages) {
          if (!msg.message.lue && msg.envoyeur._id != this.employe?._id)
            this.nonLueMsg += 1;
        }
      }
    });
  }

  afficherNotif() {
    this.nonLueNotif = 0;
    if (this.employe) {
      this.notifService.afficherRecep(this.employe?._id).subscribe((res) => {
        this.notifications = res;
        for (const notif of res) {
          if (notif.lue == false) this.nonLueNotif += 1;
        }
      });
    }
  }

  confirmer(notif: any) {
    this.notifService.confirmer(notif._id).subscribe((res) => {
      if (res) {
        if (res.contenu == 'invitation') {
          let data = {
            envoyeur: res.recepteur,
            recepteur: res.envoyeur,
            contenu: 'Votre demande keblou hawka',
            ticket: res.ticket,
            lue: false,
          };
          this.notifService.envoyer(data).subscribe((res) => {
            console.log('ena envoyer mtaa confirmer');
            this.afficherNotif();
          });
        }
      }
    });

    this.socketService.emit('confirmerNotif', notif._id);
  }
  supprimer(notif: any) {
    this.notifService.supprimer(notif._id).subscribe((res) => {
      if (res) {
        if (res.contenu == 'invitation') {
          let data = {
            envoyeur: res.recepteur,
            recepteur: res.envoyeur,
            contenu: 'Votre demande keblouch l masakh hawka',
            ticket: res.ticket,
            lue: false,
          };
          this.notifService.envoyer(data).subscribe((res) => {
            this.afficherNotif();
          });
        }
      }
    });
  }
  marquer() {
    let notif = this.notifications.filter(function (el: any) {
      return el.lue == false;
    });
    if (notif.length > 0)
      this.notifService.marquer(notif).subscribe((res) => {
        this.afficherNotif();
      });
    this.afficherNotif();
  }

  redirect(notif: any) {

    let link = ['agent/tickets/', notif.ticket._id];
    if (notif.contenu == 'reclamation') link = ['admin/reclamation'];
    this.router.navigate(link);
  }

  filterData(enteredData: any) {
    if (enteredData)
      this.employeFilter = this.employes?.filter((item) => {
        return item.nom.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
      });
  }

  select(employe: any) {
    this.employeFilter = [];
    this.formRech.reset();

    this.selectEmployeEvent.emit(employe);
  }
  rand(array: any) {
    let i = 0;
    let colors = ['#f07167', '#FA8072', '#26978B', '#C70039', '#FFCE5F'];
    while (i <= array.length) {
      var item = colors[Math.floor(Math.random() * colors.length)];
      this.colors.push(item);
      i++;
    }
  }
}
