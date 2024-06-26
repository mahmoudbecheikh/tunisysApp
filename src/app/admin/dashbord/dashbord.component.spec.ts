import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { TicketService } from 'src/app/services/ticket.service';

import { DashbordComponent } from './dashbord.component';

describe('DashbordComponent', () => {
  let component: DashbordComponent;
  let fixture: ComponentFixture<DashbordComponent>;
  let ticketParMois = [
    {
      _id: '04',
      number: 4,
    },
    {
      _id: '05',
      number: 9,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), ChartsModule],
      providers: [TicketService],
      declarations: [DashbordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verifier methode', () => {
    let result = component.verify(ticketParMois, 4);
    expect(result).toEqual(4);
  });

  it('should return stat', () => {
    const service = fixture.debugElement.injector.get(TicketService);
    const spy = spyOn(service, 'afficherStat').and.returnValue(new Observable());
    component.ngOnInit()
    expect(spy).toHaveBeenCalledWith();
  });
});
