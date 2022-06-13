import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RapportService } from 'src/app/services/rapport.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Rapport } from 'src/models/rapport';
import { Ticket } from 'src/models/ticket';

import { RapportComponent } from './rapport.component';

describe('RapportComponent', () => {
  let component: RapportComponent;
  let fixture: ComponentFixture<RapportComponent>;
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

    departement: {
      _id: '1',
      nom: 'maintenance',
    },
    adresse: 'aouina',
    siteWeb: 'www.amen.tn',
    fJoint: [],
    rapport : {
      recapSujet: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet',
      fJoint: [],
      dateModification: '2022-04-30T22:24:39.778+00:00',
    },

    date: '2022-04-30T22:24:39.778+00:00',
    dateModif: '2022-04-30T22:24:39.778+00:00',
  };

  let fakeRapport: Rapport = {
    _id: '1',
    recapSujet: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet',
    fJoint: [],
    dateModification: '2022-04-30T22:24:39.778+00:00',
  };
  let fakeAttachmentList : any [] = [{
    url : "http://localhost:3000/uploads/1654204982012 employe.txt",
    name : "employe.txt"
  }]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers: [RapportService,TicketService,AuthService],
      declarations: [ RapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('afficher ticket', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    spyOn(service, 'afficherId').and.returnValue(of(fakeTicket));
    component.ngOnInit()
    expect(component.ticketSelected).toEqual(fakeTicket);
    fixture.detectChanges();
    const sujetElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#sujet')
    ).nativeElement;
    const descElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#description')
    ).nativeElement;
    if(fakeRapport.recapSujet && fakeRapport.description){
      expect(sujetElement.value).toContain(fakeRapport.recapSujet)
      expect(descElement.value).toContain(fakeRapport.description)
    }
  });

  
  it('submitting a form emits a rapport', () => {
    const repportService = fixture.debugElement.injector.get(RapportService);
    const spy = spyOn(repportService, 'ajouter').and.returnValue(of(fakeRapport));
    expect(component.myForm.valid).toBeFalsy();
    component.recapSujet.setValue('Lorem ipsum');
    component.description.setValue('Lorem ipsum dolor sit amet');
    expect(component.myForm.valid).toBeTruthy();
    component.ajouter();
    expect(spy).toHaveBeenCalledWith(component.formdata);
  });

  it('submitting a form emits a rapport', () => {
    const service = fixture.debugElement.injector.get(RapportService);
    const spy = spyOn(service, 'modifier').and.returnValue(of(fakeRapport));
    component.rapport = fakeRapport
    component.ticketSelected = fakeTicket
    component.modifier();
    expect(spy).toHaveBeenCalledWith(component.rapport._id,component.formdata);
  });

  it('delete files', () => {
    component.attachmentList = fakeAttachmentList
   component.deleteFile(0)
    expect(component.attachmentList).toEqual([])
    expect(component.formdata.get('FjointDeleted')).toBeTruthy()
  });
});
