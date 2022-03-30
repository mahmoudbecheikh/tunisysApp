import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  constructor(private mailService: MailService) {}

  mails: any = [];

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.mailService
      .affcherListe('tunisys.mb.sj@gmail.com', 'ALL')
      .subscribe((res) => {
        if (res.length> 0) {
          console.log(res)
          let inboxSorted = res.sort((a: any, b: any) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );
          this.mails = inboxSorted;
        }
      });
  }

  vu(uid: any) {
    let data = {
      email: 'tunisys.mb.sj@gmail.com',
      uid: uid,
    };
    this.mailService.modifier(data).subscribe((res) => {
      console.log(res);
      this.afficherListe();
    });
  }
  supprimer(uid: any) {
    this.mailService
      .supprimer('tunisys.mb.sj@gmail.com', uid)
      .subscribe((res) => {
        console.log(res);
        this.afficherListe();
      });
  }
}
