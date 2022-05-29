import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { TicketService } from '../services/ticket.service';

import { PreviewPdfComponent } from './preview-pdf.component';

describe('PreviewPdfComponent', () => {
  let component: PreviewPdfComponent;
  let fixture: ComponentFixture<PreviewPdfComponent>;

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
});
