import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/models/departement';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employe[] = [];
  employeesFilter: Employe[] = [];

  employe?: Employe;
  colors: string[] = [];
  p: number = 1;
  departementsArray: Departement[] = [];
  rolesArray: string[] = ['admin', 'assistant', 'agent'];
  form: FormGroup = new FormGroup({});

  departements: FormArray = new FormArray([]);
  roles: FormArray = new FormArray([]);
  nom: FormControl = new FormControl();
  show: boolean = false;
  employeeSelected?: Employe;
  constructor(
    private empService: EmployeeService,
    private authService: AuthService,
    private depService: DepartementService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.afficherListe();
    this.listDepartement();

    this.form = new FormGroup({
      departements: this.departements,
      roles: this.roles,
    });

    this.nom.valueChanges.subscribe((res) => {
      this.employeesFilter = this.employees?.filter((item) => {
        if (item.nomEmp && item.prenomEmp)
          return (
            item.nomEmp.toLowerCase().indexOf(res.toLowerCase()) > -1 ||
            item.prenomEmp.toLowerCase().indexOf(res.toLowerCase()) > -1
          );
        else return;
      });
    });
  }

  onCheckboxChange(formArray: FormArray, e: any) {
    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      formArray.value.forEach((item: FormControl) => {
        if (item == e.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submit();
  }

  submit() {
    let departements = this.departements.value;
    let roles = this.roles.value;
    if (this.roles.length == 0 && this.departements.length == 0) {
      this.employeesFilter = this.employees;
    } else {
      this.employeesFilter = this.employees.filter(function (el) {
        return (
          (departements.includes(el.departement?.nom) ||
            departements.length == 0) &&
          (roles.includes(String(el.role)) || roles.length == 0)
        );
      });
    }
  }

  listDepartement() {
    this.depService.afficherListe().subscribe((res) => {
      this.departementsArray = res as Departement[];
    });
  }
  afficherListe() {
    this.empService.afficherListe().subscribe((res) => {
      if(Array.isArray(res) && res.length>0 ){
        this.employees = res as Employe[];
        this.employeesFilter = res;
        this.rand(res);
      }
    });
    
  }
  toAdd() {
    this.router.navigate(['admin/employees/add']);
  }

  goToUpdate(id: any) {
    const link = ['admin/employees/update/', id];
    this.router.navigate(link);
  }

  selectEmp(employee : Employe) {
    this.employeeSelected = employee
  }

  supprimer(id: any) {
    this.empService.supprimer(id).subscribe((res) => {
      if (res.errorDep) {
        console.log('aaaa')
        this.toastr.warning("L'employé a un ticket", 'Attention!');
      } else {
        this.afficherListe();
        this.toastr.success('', 'Employé supprimé avec succès!');
      }
    });
    this.authService.getAuth().subscribe((emp) => {
      if (emp._id == id) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  index(alphabets: string[], c: any) {
    return alphabets.includes(c);
  }

  rand(array: any) {
    let i = 0;
    let colors = ['#f07167', '#FA8072', '#26978B', '#C70039', '#FFCE5F'];
    while (i <= array.length) {
      var item = colors[Math.floor(Math.random() * colors.length)];
      this.colors.push(item);
      i++;
    }
  }
}
