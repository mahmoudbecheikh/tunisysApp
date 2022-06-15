import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Employe } from 'src/models/employe';
import { Reclamation } from 'src/models/reclamation';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css'],
})
export class ListReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  p: number = 1;
  reclamationSelected?: Reclamation;
  employe?: Employe;
  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.afficherListe();
    this.authService.getAuth().subscribe((res) => {
      this.employe = res;
    });
  }

  afficherListe() {
    this.ticketService.afficherReclamation().subscribe((res) => {
      this.reclamations = res;
    });
  }

  supprimer(id: any) {
    this.ticketService.supprimerReclamation(id).subscribe((res) => {
      this.afficherListe();
      let notification = {
        envoyeur: this.employe,
        recepteur: res.employe,
        contenu: 'Votre reclamation est rejetée',
        ticket: res.ticket,
      };
      this.notifService.envoyer(notification).subscribe((res) => {
      });
    });
  }

  confirmer(reclamation : Reclamation){
    this.ticketService.supprimerReclamation(reclamation._id).subscribe((res) => {
      this.afficherListe();
      let notification = {
        envoyeur: this.employe,
        recepteur: res.employe,
        contenu: 'Votre relcamation est considerée',
        ticket: res.ticket,
      };
      this.notifService.envoyer(notification).subscribe((res) => {
      });
    });
   
  }
  

  select(reclamation: Reclamation) {
    this.reclamationSelected = reclamation;
  }
}
