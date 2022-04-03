import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';

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
    let data = {
      email : 'tunisys.mb.sj@gmail.com',
      option : 'ALL'
    }
    this.mailService.afficherListe(data)
      .subscribe((res) => {
        if (res.length > 0) {
          console.log(res);
          let inboxSorted = res.sort((a: any, b: any) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );
          this.mails = inboxSorted;
        }
      });
  }



  download(mail: any) {
    let buff = Buffer.from(mail.content).toString('base64');
    let encoded: string = atob(buff);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(encoded.length);
    const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < encoded.length; i++) {
      int8Array[i] = encoded.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: mail.contentType });
    console.log(blob);
    saveAs(blob, mail.filename);
  }

  vu(uid: any) {
    let data = {
      email: 'tunisys.mb.sj@gmail.com',
      uid: uid,
    };
    this.mailService.modifier(data).subscribe((res) => {
      console.log(res);
      // this.afficherListe();
    });
  }
  supprimer(uid: any) {
    this.mailService
      .supprimer('tunisys.mb.sj@gmail.com', uid)
      .subscribe((res) => {
        console.log(res);
        // this.afficherListe();
      });
  }
}
