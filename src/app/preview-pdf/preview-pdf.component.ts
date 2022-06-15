import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/models/ticket';
import { TicketService } from '../services/ticket.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css'],
})
export class PreviewPdfComponent implements OnInit {
  ticket?: Ticket;
  id?: string;
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ticketService.afficherId(this.id).subscribe((res) => {
        this.ticket = res ;
    });
  }

  
  public openPDF() {
    let DATA: any = document.getElementById('table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 205;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('ticket_'+this.ticket?.ref);
      return true
    });
  }

}
