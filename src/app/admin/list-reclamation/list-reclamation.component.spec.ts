import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';
import { Reclamation } from 'src/models/reclamation';

import { ListReclamationComponent } from './list-reclamation.component';

describe('ListReclamationComponent', () => {
  let component: ListReclamationComponent;
  let fixture: ComponentFixture<ListReclamationComponent>;
  let fakeReclamation: Reclamation[] = [
    {
      _id: '1',
      raison: '',
      employe: undefined,
      ticket: undefined,
      date: ''

    },
    {
      _id: '1',
      raison: '',
      employe: undefined,
      ticket: undefined,
      date: ''
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers: [TicketService],
      declarations: [ ListReclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('list reclamtion ', () => {
    const service = fixture.debugElement.injector.get(TicketService);

    spyOn(service, 'afficherReclamation').and.returnValue(of(fakeReclamation));
    component.afficherListe();
    expect(component.reclamations).toEqual(fakeReclamation);
  });

  it('supprimer', () => {
    const service = fixture.debugElement.injector.get(TicketService);

    const spy = spyOn(service, 'supprimerReclamation').and.returnValue(of(fakeReclamation[0]));
    const _id = '1';
    component.supprimer(_id);
    expect(spy).toHaveBeenCalledWith(_id);
  });
});
