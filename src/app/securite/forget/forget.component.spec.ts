import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { ForgetComponent } from './forget.component';

describe('ForgetComponent', () => {
  let component: ForgetComponent;
  let fixture: ComponentFixture<ForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,ReactiveFormsModule,ToastrModule.forRoot()],
      providers: [AuthService],
      declarations: [ ForgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shyh', () => {

    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'forget').and.returnValue(of({send : true}));
    component.envoyer();
    expect(component.error).toEqual('')
  });

  it('mawselch', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'forget').and.returnValue(of({send : false}));
    component.envoyer();
    expect(component.error).toEqual("Une erreur s'est produite lors de l'envoi") ; 
    fixture.detectChanges();
    const errorElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#error')
    ).nativeElement;
    expect(errorElement.textContent).toContain("Une erreur s'est produite lors de l'envoi")
  });
 
  
  it('mouch kifkif', () => {
    const service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'forget').and.returnValue(of(null));
    component.envoyer();
    expect(component.error).toEqual("Adresse email invalide") ; 
    fixture.detectChanges();
    const errorElement: HTMLInputElement = fixture.debugElement.query(
      By.css('#error')
    ).nativeElement;
    expect(errorElement.textContent).toContain("Adresse email invalide")
  });

  
 
});
