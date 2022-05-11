import { not } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';
import { SocketService } from '../services/socket.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications: any;
  employe?: Employe;
  employes?: any[] = [];
  employeFilter?: any[] = [];
  results?: any[] = [];
  show: boolean = false;

  formRech: FormGroup = new FormGroup({});
  nom: FormControl = new FormControl('', []);
  @Output() selectEmployeEvent = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private notifService: NotificationService,
    private ticketService: TicketService,
    private socketService: SocketService,
    private employeService : EmployeeService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
      this.socketService.emit('joinRoom', { id: res?._id });

      this.afficherNotif();
    });
    this.formRech = new FormGroup({
      nom: this.nom,
    });


    
    


    this.employeService.afficherListe().subscribe((res) => {
      if (res){
        for (const employe of res) {
          let nom = employe.nomEmp+' '+employe.prenomEmp
          this.employes?.push({_id : employe._id , nom :nom})
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
      console.log(res)
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
    });
  }

  afficherNotif() {
    this.notifService.afficherRecep(this.employe?._id).subscribe((res) => {
      this.notifications = res;
    });
  }

  confirmer(notif: any) {

    this.notifService.confirmer(notif._id).subscribe(res=>{
      console.log(res)
      if(res){
        if (res.contenu == 'invitation') {
          let data = {
            envoyeur: res.recepteur,
            recepteur: res.envoyeur,
            contenu: 'Votre demande keblou hawka',
            ticket: res.ticket,
            lue: false,
          };
          this.notifService.envoyer(data).subscribe(res=>{
            console.log(data)
            console.log('ena envoyer mtaa confirmer')
            this.afficherNotif()
          })
        }
      }
    })

    this.socketService.emit('confirmerNotif', notif._id);
  }
  supprimer(notif: any) {
    this.notifService.supprimer(notif._id).subscribe(res=>{
      if(res){
        if (res.contenu == 'invitation') {
          let data = {
            envoyeur: res.recepteur,
            recepteur: res.envoyeur,
            contenu: 'Votre demande keblouch l masakh hawka',
            ticket: res.ticket,
            lue: false,
          };
          this.notifService.envoyer(data).subscribe(res=>{
            this.afficherNotif()
          })
        }
      }
    })
  }
  marquer() {
    let notif = this.notifications.filter(function (el: any) {
      return el.lue == false;
    });
    this.notifService.marquer(notif).subscribe((res) => {
      this.afficherNotif();
    });
  }

  filterData(enteredData: any) {
    if(enteredData)
    this.employeFilter = this.employes?.filter((item) => {
      return item.nom.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
  }

  select(employe:any){
    this.formRech.reset();
    this.selectEmployeEvent.emit(employe);

  }


}
