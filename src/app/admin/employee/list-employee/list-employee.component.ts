import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employe } from 'src/models/employe';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees: Employe[] = [];
  colors = ['#00afb9', '#f07167'];

  constructor(
    private empService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afficherListe();
  }

  afficherListe() {
    this.empService.afficherListe().subscribe((res) => {
      this.employees = res as Employe[];
    });
  }
  toAdd() {
    this.router.navigate(['admin/employees/add']);
  }

  goToUpdate(id: any) {
    const link = ['admin/employees/update/', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {
    this.empService.supprimer(id).subscribe((res) => {
      this.afficherListe();
      if (res._id == id) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

  index(alphabets: string[], c: any) {
    return alphabets.includes(c);
  }

  rand() {
    var item = this.colors[Math.floor(Math.random() * this.colors.length)];
    return '#00afb9';
  }
}
