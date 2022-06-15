import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Ticket } from 'src/models/ticket';
import { TicketService } from '../services/ticket.service';

import { PreviewPdfComponent } from './preview-pdf.component';

describe('PreviewPdfComponent', () => {
  let component: PreviewPdfComponent;
  let fixture: ComponentFixture<PreviewPdfComponent>;
  let fakeTicket: Ticket = {
    _id: '1',
    ref: 100056,
    sujet: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet',
    manuel: 'admin',
    statut: 'en attente',
    emailClient: 'amen@gmail.com',
    nomClient: 'Amen',
    telClient: 20789456,
    rapport: undefined,
    departement: {
      _id: '1',
      nom: 'maintenance',
    },
    employe: undefined,
    feedBack: undefined,

    adresse: 'aouina',
    siteWeb: 'www.amen.tn',
    fJoint: [],
    tags: [],
    collaborateurs: [],
    date: '2022-04-30T22:24:39.778+00:00',
    dateModif: '2022-04-30T22:24:39.778+00:00',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,ToastrModule.forRoot()],
      providers: [TicketService],
      declarations: [ PreviewPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'afficherId').and.returnValue(of(fakeTicket));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ticket).toEqual(fakeTicket);
    const refElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#ref')
    ).nativeElement;
    if (fakeTicket.ref)
      expect(refElement.innerText).toContain(String(fakeTicket.ref));
  });

  it('should not select', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'afficherId').and.returnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ticket).toEqual(fakeTicket);
    const refElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#ref')
    ).nativeElement;
    if (fakeTicket.ref)
      expect(refElement.innerText).toContain(String(fakeTicket.ref));
  });


  it('should preview save', () => {
  
    component.ticket = fakeTicket
    let response = component.openPDF()
    fixture.detectChanges();
    expect(response).toBeTruthy()
    
  });


});
