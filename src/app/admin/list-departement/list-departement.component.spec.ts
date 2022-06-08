import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListDepartementComponent } from './list-departement.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Departement } from 'src/models/departement';
import { By } from '@angular/platform-browser';
describe('ListDepartementComponent', () => {
  let component: ListDepartementComponent;
  let fixture: ComponentFixture<ListDepartementComponent>;
  let fakeDepartements: Departement[] = [
    {
      _id: '1',
      nom: 'infrastructure',
      employes: [],
      tickets: [],
    },
    {
      _id: '2',
      nom: 'maintenance',
      employes: [],
      tickets: [],
    },
  ];

  let fakeDepartement: Departement = {
    _id: '1',
    nom: 'infrastructure',
    employes: [],
    tickets: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [DepartementService],
      declarations: [ListDepartementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('list departement ', () => {
    const service = fixture.debugElement.injector.get(DepartementService);

    spyOn(service, 'afficherListe').and.returnValue(of(fakeDepartements));
    component.getListDep();
    expect(component.departements).toEqual(fakeDepartements);
  });

  it('form vide', () => {
    component.reset();
    expect(component.departement).toBeUndefined();
  });

  it('supprimer', () => {
    const service = fixture.debugElement.injector.get(DepartementService);
    const toastrService = fixture.debugElement.injector.get(ToastrService);
    const toastrSpy = spyOn(toastrService, 'success')
    const spy = spyOn(service, 'supprimer').and.returnValue(of(fakeDepartement));
    const _id = '1';
    component.supprimer(_id);
    expect(spy).toHaveBeenCalledWith(_id);
    expect(toastrSpy).toHaveBeenCalled();
  });



  // it('select departement', () => {
  //   const service = fixture.debugElement.injector.get(DepartementService);
  //   const spy = spyOn(service, 'afficherId').and.returnValue(of(fakeDepartement));
  //   const _id = '1';
  //   component.selectDepartement(fakeDepartement);
  //   expect(spy).toHaveBeenCalledWith(_id);
  //   expect(component.departement).toEqual(fakeDepartement);
  //   const nameElement: HTMLInputElement = fixture.debugElement.query(
  //     By.css('#nom')
  //   ).nativeElement;
  //   expect(nameElement.value).toContain('infrastructure');
  // });


});
