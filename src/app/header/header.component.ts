import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications: any;
  employe?: Employe;
  constructor(
    private authService: AuthService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
      this.afficherNotif();
    });
  }

  afficherNotif() {
    this.notifService.afficherRecep(this.employe?._id).subscribe((res) => {
      this.notifications = res;
      console.log(this.notifications);
    });
  }

  confirmer(notif: any) {
    this.notifService.confirmer(notif._id).subscribe((res) => {
      console.log(res);
      this.supprimer(notif)
    });
  }
  supprimer(notif: any) {
    this.notifService.supprimer(notif._id).subscribe((res) => {
      console.log(res);
      this.afficherNotif();
    });
  }
  marquer() {
    let notif = this.notifications.filter(function (el: any) {
      return el.lue == false;
    });
    this.notifService.marquer(notif).subscribe((res) => {
      console.log(res);
      this.afficherNotif();
    });
  }
}
